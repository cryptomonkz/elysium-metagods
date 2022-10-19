package com.elysium.metagods.service.entity;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.TournamentRewardDistributed;
import com.elysium.metagods.repository.TournamentRewardDistributedRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class TournamentRewardDistributedService {

    private final TournamentRewardDistributedRepository tournamentRewardDistributedRepository;

    public TournamentRewardDistributedService(
        TournamentRewardDistributedRepository tournamentRewardDistributedRepository
    ) {
        this.tournamentRewardDistributedRepository = tournamentRewardDistributedRepository;
    }

    public TournamentRewardDistributed save(TournamentRewardDistributed tournamentRewardDistributed) {
        return tournamentRewardDistributedRepository.save(tournamentRewardDistributed);
    }
}
