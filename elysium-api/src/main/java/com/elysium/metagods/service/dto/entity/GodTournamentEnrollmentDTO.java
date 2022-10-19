package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodTournamentEnrollmentDTO implements Serializable {

    private Long id;

    private Long totalPoints;

}
