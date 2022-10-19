package com.elysium.metagods.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import static com.elysium.metagods.service.entity.ExecutedCronService.Job.PROCESS_TOURNAMENT_QUESTS;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.service.entity.GodQuestService;
import com.elysium.metagods.service.entity.TournamentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class TournamentQuestJobService {

    private final TournamentService tournamentService;

    private final GodQuestService godQuestService;

    private final TournamentQuestService tournamentQuestService;

    public void processTournamentQuests() {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();
        long currentQuestPeriodNumber = tournament.getCurrentQuestPeriodNumber();
        if(currentQuestPeriodNumber < 0) {
            log.info("Tournament hasn't started yet. Skipping quests processing");
            return;
        }

        dismissAssignableQuests(tournament, currentQuestPeriodNumber);
        processQuestResults(tournament, currentQuestPeriodNumber);
        distributeQuestsIfNecessary(tournament, currentQuestPeriodNumber);
    }

    private void dismissAssignableQuests(Tournament tournament, long currentQuestPeriodNumber) {
        log.info("{}: Dismissing assignable quests", PROCESS_TOURNAMENT_QUESTS);
        int questsAffected = godQuestService.dismissAssignableQuestsFromPreviousPeriodsNumber(
            tournament.getId(),
            currentQuestPeriodNumber
        );
        log.info("{}: Dismissed {} assignable quests", PROCESS_TOURNAMENT_QUESTS, questsAffected);
    }

    private void processQuestResults(Tournament tournament, long currentQuestPeriodNumber) {
        log.info("{}: Processing quest results", PROCESS_TOURNAMENT_QUESTS);
        tournamentQuestService.processQuestResultsBeforePeriodNumber(tournament.getId(), currentQuestPeriodNumber);
        log.info("{}: Finished processing quest results", PROCESS_TOURNAMENT_QUESTS);
    }

    private void distributeQuestsIfNecessary(Tournament tournament, long currentQuestPeriodNumber) {
        long numberOfQuestsDistributedForCurrentPeriodNumber =
            godQuestService.countQuestsByTournamentAndPeriodNumber(tournament, currentQuestPeriodNumber);

        Instant currentTime = Instant.now();
        if (
            numberOfQuestsDistributedForCurrentPeriodNumber == 0 &&
            currentTime.isBefore(tournament.getTournamentEndTime())
        ) {
            log.info("{}: Distributing new quests", PROCESS_TOURNAMENT_QUESTS);
            tournamentQuestService.distributeNewQuestsForPeriodNumber(tournament.getId(), currentQuestPeriodNumber);
            log.info("{}: Finished distributing new quests", PROCESS_TOURNAMENT_QUESTS);
        } else {
            log.info(
                "{}: Distributing new quests is not necessary. " +
                "Num of quests already distributed {}, " +
                "tournamentEndTime {}, " +
                "jobTime {}",
                PROCESS_TOURNAMENT_QUESTS,
                numberOfQuestsDistributedForCurrentPeriodNumber,
                tournament.getTournamentEndTime(),
                currentTime
            );
        }
    }

}
