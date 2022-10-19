package com.elysium.metagods.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.TournamentRewardDistributed;
import com.elysium.metagods.domain.TournamentRewardWinner;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.service.entity.TournamentRewardDistributedService;
import com.elysium.metagods.service.entity.TournamentService;
import com.elysium.metagods.service.entity.WalletService;
import com.elysium.metagods.service.query.TournamentLeaderboardQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class TournamentRewardService {

    private final TournamentService tournamentService;

    private final TournamentLeaderboardQueryService tournamentLeaderboardQueryService;

    private final TournamentRewardDistributedService tournamentRewardDistributedService;

    private final WalletService walletService;

    public void distributeRewards() {

        log.info("Started distributing rewards");

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        if(Instant.now().isBefore(tournament.getTournamentEndTime())) {
            throw new InvalidRequestException(
                "Tournament " + tournament.getId() + " is not due to rewards distribution"
            );
        }

        List<TournamentRewardWinner> winners = new ArrayList<>();

        tournamentLeaderboardQueryService.findAll().forEach(dto -> {
            if(dto.getReward() > 0) {
                walletService.addAmountToWallet(dto.getWalletAddress(), dto.getReward().doubleValue());
            }
            winners.add(new TournamentRewardWinner(dto));
        });

        TournamentRewardDistributed tournamentRewardDistributed = new TournamentRewardDistributed()
            .setDistribution(winners)
            .setTournament(tournament);

        tournamentRewardDistributedService.save(tournamentRewardDistributed);

        log.info("Finished distributing rewards");
    }
}
