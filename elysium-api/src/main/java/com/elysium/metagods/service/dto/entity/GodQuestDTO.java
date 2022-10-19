package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodQuestDTO implements Serializable {

    private Long id;

    private GodQuestStatus status;

    private Integer periodNumber;

    private GodQuestResultDTO result;

    private QuestDTO quest;

    private GodTournamentEnrollmentDTO godEnrolled;

}
