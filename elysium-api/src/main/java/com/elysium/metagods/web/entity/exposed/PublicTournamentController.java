package com.elysium.metagods.web.entity.exposed;

import javax.validation.constraints.NotNull;
import java.util.List;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elysium.metagods.service.OwnerSyncService;
import com.elysium.metagods.service.TournamentEnrollmentService;
import com.elysium.metagods.service.TournamentQuestService;
import com.elysium.metagods.service.criteria.TournamentLeaderboardCriteria;
import com.elysium.metagods.service.dto.EnrolledGodDetails;
import com.elysium.metagods.service.dto.TournamentLeaderboardDTO;
import com.elysium.metagods.service.dto.entity.TournamentDTO;
import com.elysium.metagods.service.dto.response.GodCurrentQuestsResponse;
import com.elysium.metagods.service.dto.response.TournamentEnrollmentStatusResponse;
import com.elysium.metagods.service.dto.response.TournamentNextQuestsAssignationResponse;
import com.elysium.metagods.service.entity.TournamentService;
import com.elysium.metagods.service.query.TournamentLeaderboardQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/tournament")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class PublicTournamentController {

    private final TournamentService tournamentService;
    private final TournamentQuestService tournamentQuestService;
    private final TournamentEnrollmentService tournamentEnrollmentService;
    private final TournamentLeaderboardQueryService tournamentLeaderboardQueryService;
    private final OwnerSyncService ownerSyncService;

    @GetMapping("/current")
    public ResponseEntity<TournamentDTO> getCurrentTournament() {
        TournamentDTO tournamentDTO = tournamentService.findActiveTournamentDTO();
        return ResponseEntity.ok(tournamentDTO);
    }

    @GetMapping("/current/next-quest")
    public ResponseEntity<TournamentNextQuestsAssignationResponse> getCurrentTournamentNextQuests() {
        return ResponseEntity.ok(
            tournamentQuestService.getNextQuestAssignation()
        );
    }

    @GetMapping("/enrollment-status/{address}")
    public ResponseEntity<TournamentEnrollmentStatusResponse> getEnrollmentStatus(
        @NotNull @PathVariable String address
    ) {
        ownerSyncService.syncTokensOfOwner(address);
        return ResponseEntity.ok(tournamentEnrollmentService.getActiveTournamentStatus(address));
    }

    @GetMapping("/enrolled/{address}")
    public ResponseEntity<List<EnrolledGodDetails>> getEnrolledGods(
        @NotNull @PathVariable String address
    ) {
        ownerSyncService.syncTokensOfOwner(address);
        return ResponseEntity.ok(tournamentEnrollmentService.getEnrolledGods(address));
    }

    @GetMapping("/quests/{godId}")
    public ResponseEntity<GodCurrentQuestsResponse> getGodQuests(@PathVariable Long godId) {
        GodCurrentQuestsResponse response = tournamentQuestService.getGodQuests(godId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<Page<TournamentLeaderboardDTO>> getTournamentLeaderboard(
        TournamentLeaderboardCriteria criteria,
        Pageable pageable
    ) {
        Page<TournamentLeaderboardDTO> page = tournamentLeaderboardQueryService.findByCriteria(criteria, pageable);
        return ResponseEntity.ok().body(page);
    }

}
