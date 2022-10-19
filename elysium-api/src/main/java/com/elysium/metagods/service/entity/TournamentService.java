package com.elysium.metagods.service.entity;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.TournamentRepository;
import com.elysium.metagods.service.dto.entity.TournamentDTO;
import com.elysium.metagods.service.mapper.TournamentMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Implementation for managing {@link Tournament}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class TournamentService {

    private final TournamentRepository tournamentRepository;

    private final TournamentMapper tournamentMapper;

    @Transactional(readOnly = true)
    public Optional<Tournament> findActiveTournament() {
        return tournamentRepository.findOneByActiveTrue();
    }

    @Transactional(readOnly = true)
    public Tournament findActiveTournamentOrThrow() {
        return findActiveTournament()
            .orElseThrow(() -> new NotFoundException("No active tournament found"));
    }

    @Transactional(readOnly = true)
    public TournamentDTO findActiveTournamentDTO() {
        return tournamentMapper.toDto(
            findActiveTournamentOrThrow()
        );
    }

    public void addAmountToTotalFeesCollected(Tournament tournament, long enrollmentTax) {
        tournamentRepository.addAmountToTotalFeesCollected(tournament.getId(), enrollmentTax);
    }
}
