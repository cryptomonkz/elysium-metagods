package com.elysium.metagods.web.entity;

import javax.validation.Valid;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elysium.metagods.service.TournamentEnrollmentService;
import com.elysium.metagods.service.TournamentQuestService;
import com.elysium.metagods.service.dto.request.AssignQuestToGodRequest;
import com.elysium.metagods.service.dto.request.EnrollGodsInTournamentRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/tournament")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class TournamentController {

    private final TournamentQuestService tournamentQuestService;

    private final TournamentEnrollmentService tournamentEnrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<Void> enrollGodsInTournament(
        @Valid @RequestBody EnrollGodsInTournamentRequest body
    ) {
        tournamentEnrollmentService.enrollGods(body);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/quests")
    public ResponseEntity<Void> assignQuestToGod(
        @Valid @RequestBody AssignQuestToGodRequest body
    ) {
        tournamentQuestService.assignQuest(body);
        return ResponseEntity.ok().build();
    }

}
