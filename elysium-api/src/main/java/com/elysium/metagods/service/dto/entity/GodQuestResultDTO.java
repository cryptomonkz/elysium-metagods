package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import com.elysium.metagods.domain.GodQuestResultBreakdown;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodQuestResultDTO implements Serializable {

    private Long id;

    private Boolean isSuccessful;

    private Long pointsGained;

    private GodQuestResultBreakdown pointsBreakdown;

}
