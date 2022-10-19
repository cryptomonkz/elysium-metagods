package com.elysium.metagods.service.entity;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.GodQuest;
import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import com.elysium.metagods.repository.GodQuestRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class GodQuestService {

    private final GodQuestRepository godQuestRepository;

    public GodQuestService(GodQuestRepository godQuestRepository) {
        this.godQuestRepository = godQuestRepository;
    }

    public List<GodQuest> saveAll(List<GodQuest> assignableQuests) {
        return godQuestRepository.saveAll(assignableQuests);
    }

    public int dismissAssignableQuestsFromPreviousPeriodsNumber(Long tournamentId, long currentQuestPeriodNumber) {
        return godQuestRepository.changeQuestStatusBeforeQuestPeriodNumber(
            tournamentId,
            GodQuestStatus.ASSIGNABLE.name(),
            GodQuestStatus.DISMISSED.name(),
            currentQuestPeriodNumber
        );
    }

    public long countQuestsByTournamentAndPeriodNumber(Tournament tournament, long currentQuestPeriodNumber) {
        return godQuestRepository.countAllByPeriodNumberAndGodEnrolled_Tournament(currentQuestPeriodNumber, tournament);
    }

    public long countQuestsByTournamentAndStatusIn(Tournament tournament, List<GodQuestStatus> statuses) {
        return godQuestRepository.countAllByStatusInAndGodEnrolled_Tournament(statuses, tournament);
    }

    public void save(GodQuest godQuest) {
        godQuestRepository.save(godQuest);
    }
}
