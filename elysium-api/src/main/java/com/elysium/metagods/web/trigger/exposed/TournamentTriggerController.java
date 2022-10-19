package com.elysium.metagods.web.trigger.exposed;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elysium.metagods.service.TournamentRewardService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/tournament/trigger")
@ConditionalOnProperty(prefix = "application.instance", value = "with-triggers", havingValue = "true")
public class TournamentTriggerController {

    private final TournamentRewardService tournamentRewardService;

    @PostMapping("/distribute-rewards")
    public void distributeRewardsForCurrentTournament() {
        tournamentRewardService.distributeRewards();
    }

}
