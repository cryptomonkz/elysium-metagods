package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.time.Instant;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TournamentDTO implements Serializable {

    private Long tournamentNumber;

    private Instant enrollmentStartTime;

    private Instant enrollmentEndTime;

    private Instant tournamentStartTime;

    private Instant tournamentEndTime;

    private Long enrollmentFee;

}
