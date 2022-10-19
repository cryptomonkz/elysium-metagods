package com.elysium.metagods.service.dto.response;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TournamentNextQuestsAssignationResponse {
    private Instant nextQuestsAssignation;
    private Boolean currentQuestsDistributed;
}
