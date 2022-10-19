package com.elysium.metagods.service.query;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.config.ApplicationConfigurationConstant.TOURNAMENT_PARTICIPANTS_WITH_REWARD_PERCENTAGE;
import static com.elysium.metagods.config.ApplicationConfigurationConstant.TOURNAMENT_REWARD_SCALE;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.TournamentLeaderboard;
import com.elysium.metagods.domain.TournamentLeaderboard_;
import com.elysium.metagods.repository.TournamentLeaderboardRepository;
import com.elysium.metagods.service.criteria.TournamentLeaderboardCriteria;
import com.elysium.metagods.service.dto.TournamentLeaderboardDTO;
import com.elysium.metagods.service.entity.TournamentService;
import com.elysium.metagods.service.mapper.TournamentLeaderboardMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tech.jhipster.service.QueryService;

@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class TournamentLeaderboardQueryService extends QueryService<TournamentLeaderboard> {

    private final TournamentLeaderboardRepository tournamentLeaderboardRepository;

    private final TournamentLeaderboardMapper tournamentLeaderboardMapper;

    private final TournamentService tournamentService;

    @Transactional(readOnly = true)
    public Page<TournamentLeaderboardDTO> findByCriteria(TournamentLeaderboardCriteria criteria, Pageable page) {
        Tournament tournament = tournamentService.findActiveTournamentOrThrow();
        final Specification<TournamentLeaderboard> specification = createSpecification(criteria);
        Page<TournamentLeaderboardDTO> results = tournamentLeaderboardRepository
            .findAll(specification, page)
            .map(tournamentLeaderboardMapper::toDto);
        return calculateRewardsForList(tournament, results);
    }

    @Transactional(readOnly = true)
    public List<TournamentLeaderboardDTO> findAll() {
        Tournament tournament = tournamentService.findActiveTournamentOrThrow();
        List<TournamentLeaderboardDTO> results = tournamentLeaderboardRepository
            .findAll()
            .stream()
            .map(tournamentLeaderboardMapper::toDto)
            .collect(Collectors.toList());
        return calculateRewardsForList(tournament, results);
    }

    public Page<TournamentLeaderboardDTO> calculateRewardsForList(
        Tournament tournament,
        Page<TournamentLeaderboardDTO> results
    ) {
        long numberOfParticipantsWithReward = getNumberOfParticipantsWithReward();
        return results
            .map(dto -> calculatedRankReward(dto, tournament, numberOfParticipantsWithReward));
    }

    public List<TournamentLeaderboardDTO> calculateRewardsForList(
        Tournament tournament,
        List<TournamentLeaderboardDTO> results
    ) {
        long numberOfParticipantsWithReward = getNumberOfParticipantsWithReward();
        return results
            .stream()
            .map(dto -> calculatedRankReward(dto, tournament, numberOfParticipantsWithReward))
            .collect(Collectors.toList());
    }

    private long getNumberOfParticipantsWithReward() {
        return tournamentLeaderboardRepository.count() * TOURNAMENT_PARTICIPANTS_WITH_REWARD_PERCENTAGE / 100;
    }

    private TournamentLeaderboardDTO calculatedRankReward(
        TournamentLeaderboardDTO dto,
        Tournament tournament,
        long numberOfParticipantsWithReward
    ) {
        double reward = 0;
        if (dto.getRank() <= numberOfParticipantsWithReward) {
            reward = (
                         tournament.getPrizePool() *
                         (TOURNAMENT_REWARD_SCALE - 1) *
                         Math.pow(TOURNAMENT_REWARD_SCALE, numberOfParticipantsWithReward - dto.getRank())
                     ) / (
                         Math.pow(TOURNAMENT_REWARD_SCALE, numberOfParticipantsWithReward) - 1
                     );
        }

        dto.setReward((long) reward);
        return dto;
    }

    protected Specification<TournamentLeaderboard> createSpecification(TournamentLeaderboardCriteria criteria) {
        Specification<TournamentLeaderboard> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getRank() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRank(), TournamentLeaderboard_.rank));
            }
            if (criteria.getGodId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getGodId(), TournamentLeaderboard_.godId));
            }
            if (criteria.getGodName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getGodName(), TournamentLeaderboard_.godName));
            }
            if (criteria.getWalletAddress() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getWalletAddress(), TournamentLeaderboard_.walletAddress));
            }
            if (criteria.getWalletNickname() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getWalletNickname(), TournamentLeaderboard_.walletNickname));
            }
            if (criteria.getTotalPoints() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTotalPoints(), TournamentLeaderboard_.totalPoints));
            }
            if (criteria.getEnrollmentDateTime() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getEnrollmentDateTime(), TournamentLeaderboard_.enrollmentDateTime));
            }
        }
        return specification;
    }
}
