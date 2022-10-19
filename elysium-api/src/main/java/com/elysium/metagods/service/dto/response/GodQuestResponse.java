package com.elysium.metagods.service.dto.response;

import java.io.Serializable;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodQuestResponse implements Serializable {

    private Long id;

    private GodQuestStatus status;

    private Integer periodNumber;

    private Integer successChance;

    private Integer riskBonus;

    private GodQuestResultResponse result;

    private QuestResponse quest;

}
