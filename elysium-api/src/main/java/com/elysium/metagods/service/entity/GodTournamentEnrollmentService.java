package com.elysium.metagods.service.entity;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.GOD_ALREADY_ENROLLED_ERROR_MESSAGE;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.repository.GodTournamentEnrollmentRepository;
import com.elysium.metagods.service.ValidationService;
import com.elysium.metagods.service.dto.entity.GodTournamentEnrollmentDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.mapper.GodTournamentEnrollmentMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Implementation for managing {@link GodTournamentEnrollment}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class GodTournamentEnrollmentService {

    private final GodTournamentEnrollmentRepository godTournamentEnrollmentRepository;

    private final GodTournamentEnrollmentMapper godTournamentEnrollmentMapper;

    private final GodService godService;

    public GodTournamentEnrollmentDTO save(GodTournamentEnrollmentDTO godTournamentEnrollmentDTO) {
        log.debug("Request to save GodTournamentEnrollment : {}", godTournamentEnrollmentDTO);
        GodTournamentEnrollment godTournamentEnrollment = godTournamentEnrollmentMapper.toEntity(godTournamentEnrollmentDTO);
        godTournamentEnrollment = godTournamentEnrollmentRepository.save(godTournamentEnrollment);
        return godTournamentEnrollmentMapper.toDto(godTournamentEnrollment);
    }

    @Transactional(readOnly = true)
    public List<GodTournamentEnrollment> findAllByTournamentId(Long tournamentId) {
        return godTournamentEnrollmentRepository.findAllByTournamentId(tournamentId);
    }

    @Transactional
    public void enrollGod(Tournament tournament, Long godId) {
        godTournamentEnrollmentRepository.findOneByTournamentAndGodId(tournament, godId).ifPresent((ignored) -> {
            throw new InvalidRequestException(String.format(GOD_ALREADY_ENROLLED_ERROR_MESSAGE, godId));
        });

        God god = godService.findByIdOrThrow(godId);
        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, god.getId());

        GodTournamentEnrollment newEnrollment = new GodTournamentEnrollment(tournament, god);
        godTournamentEnrollmentRepository.save(newEnrollment);
    }

    public void addPoints(Long godEnrollmentId, Long pointsGained) {
        godTournamentEnrollmentRepository.addPoints(godEnrollmentId, pointsGained);
    }
}
