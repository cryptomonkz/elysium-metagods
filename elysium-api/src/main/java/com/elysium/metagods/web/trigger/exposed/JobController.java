package com.elysium.metagods.web.trigger.exposed;

import javax.validation.constraints.NotNull;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elysium.metagods.service.TournamentQuestJobService;
import com.elysium.metagods.service.entity.ExecutedCronService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/job")
@ConditionalOnProperty(prefix = "application.instance", value = "with-triggers", havingValue = "true")
public class JobController {

    private final ExecutedCronService executedCronService;

    private final TournamentQuestJobService tournamentQuestJobService;

    public ResponseEntity<String> triggerJob(@NotNull ExecutedCronService.Job job, @NotNull Runnable executor) {
        executedCronService.executeJobAsync(job, executor);
        return ResponseEntity.ok("Job triggered successfully");
    }

    @PostMapping("/deposit-reconciliation")
    public ResponseEntity<String> triggerDepositReconciliation() {
        return triggerJob(
            ExecutedCronService.Job.DEPOSIT_RECONCILIATION,
            executedCronService::triggerDepositReconciliation
        );
    }

    @PostMapping("/withdraw-reconciliation")
    public ResponseEntity<String> triggerWithdrawReconciliation() {
        return triggerJob(
            ExecutedCronService.Job.WITHDRAW_RECONCILIATION,
            executedCronService::triggerWithdrawReconciliation
        );
    }

    @PostMapping("/mint-weapons-reconciliation")
    public ResponseEntity<String> triggerMintWeaponsReconciliation() {
        return triggerJob(
            ExecutedCronService.Job.MINT_WEAPONS_RECONCILIATION,
            executedCronService::triggerMintWeaponsReconciliation
        );
    }

    @PostMapping("/tournament/process-quests")
    public ResponseEntity<String> triggerQuestsProcessing() {
        return triggerJob(
            ExecutedCronService.Job.PROCESS_TOURNAMENT_QUESTS,
            tournamentQuestJobService::processTournamentQuests
        );
    }

}
