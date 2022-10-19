package com.elysium.metagods.service.entity;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.TournamentLeaderboard;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.TournamentLeaderboardRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
public class TournamentLeaderboardService {

    private final TournamentLeaderboardRepository tournamentLeaderboardRepository;

    public TournamentLeaderboardService(
        TournamentLeaderboardRepository tournamentLeaderboardRepository
    ) {
        this.tournamentLeaderboardRepository = tournamentLeaderboardRepository;
    }

    public Optional<TournamentLeaderboard> findByGodId(Long godId) {
        return tournamentLeaderboardRepository.findByGodId(godId);
    }

    public TournamentLeaderboard findByGodIdOrThrow(Long godId) {
        return findByGodId(godId)
            .orElseThrow(() -> new NotFoundException("Could not find God with id " + godId + " in current tournament"));
    }

    public List<TournamentLeaderboard> findByWalletAddress(String walletAddress) {
        return tournamentLeaderboardRepository.findByWalletAddress(walletAddress);
    }
}
