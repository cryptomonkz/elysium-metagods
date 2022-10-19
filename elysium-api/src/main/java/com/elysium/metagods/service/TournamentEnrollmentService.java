package com.elysium.metagods.service;

import javax.validation.constraints.NotNull;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.TournamentLeaderboard;
import com.elysium.metagods.service.dto.EnrolledGodDetails;
import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.dto.request.EnrollGodsInTournamentRequest;
import com.elysium.metagods.service.dto.response.TournamentEnrollmentStatusResponse;
import com.elysium.metagods.service.entity.GodTournamentEnrollmentService;
import com.elysium.metagods.service.entity.TournamentLeaderboardService;
import com.elysium.metagods.service.entity.TournamentService;
import com.elysium.metagods.service.entity.WalletService;
import com.elysium.metagods.service.query.GodTournamentEnrollmentQueryService;
import com.elysium.metagods.service.query.StakedTokenQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class TournamentEnrollmentService {

    private final TournamentService tournamentService;

    private final TournamentLeaderboardService tournamentLeaderboardService;

    private final WalletService walletService;

    private final GodTournamentEnrollmentService godTournamentEnrollmentService;

    private final GodTournamentEnrollmentQueryService godTournamentEnrollmentQueryService;

    private final StakedTokenQueryService stakedTokenQueryService;

    private final ValidationService validationService;

    @Transactional(readOnly = true)
    public TournamentEnrollmentStatusResponse getActiveTournamentStatus(@NotNull String address) {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        List<GodTournamentEnrollment> currentTournamentEnrollments =
            godTournamentEnrollmentQueryService.findEnrolledGods(address, tournament.getId());

        Set<God> currentlyEnrolledGods = currentTournamentEnrollments
            .stream()
            .map(GodTournamentEnrollment::getGod)
            .collect(Collectors.toSet());

        List<StakedToken> availableStakedTokens = stakedTokenQueryService
            .findStakedTokens(ContractType.GOD, address)
            .stream()
            .filter(stakedToken -> !currentlyEnrolledGods.contains(stakedToken.getGod()))
            .collect(Collectors.toList());

        return new TournamentEnrollmentStatusResponse(
            availableStakedTokens,
            currentlyEnrolledGods
        );
    }

    public List<EnrolledGodDetails> getEnrolledGods(String address) {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        List<GodTournamentEnrollment> currentTournamentEnrollments =
            godTournamentEnrollmentQueryService.findEnrolledGods(address, tournament.getId());

        Map<Long, Long> godTournamentPositionsMap = tournamentLeaderboardService
            .findByWalletAddress(address)
            .stream()
            .collect(Collectors.toMap(
                TournamentLeaderboard::getGodId,
                TournamentLeaderboard::getRank
            ));

        return currentTournamentEnrollments
            .stream()
            .sorted(Comparator.comparing(godTournamentEnrollment -> godTournamentEnrollment.getGod().getId()))
            .map(godTournamentEnrollment ->
                     EnrolledGodDetails.fromGodTournamentEnrollment(
                         godTournamentEnrollment,
                         godTournamentPositionsMap.get(godTournamentEnrollment.getGod().getId())
                     )
            )
            .collect(Collectors.toList());
    }

    public void enrollGods(EnrollGodsInTournamentRequest request) {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        ValidationService.validateIsEnrollmentOpen(tournament);

        validationService.checkOwnership(ContractType.GOD, request.getGods());

        long enrollmentTax = request.getGods().size() * tournament.getEnrollmentFee();

        walletService.checkHasAmountInGameForCurrent((double) enrollmentTax);

        request.getGods().forEach(godId -> godTournamentEnrollmentService.enrollGod(tournament, godId));

        walletService.subtractAmountFromCurrentWallet((double) enrollmentTax);

        tournamentService.addAmountToTotalFeesCollected(tournament, enrollmentTax);
    }
}
