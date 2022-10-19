package com.elysium.metagods.service.dto.response;

import java.io.Serializable;

import com.elysium.metagods.domain.GodQuestResultBreakdown;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodQuestResultResponse implements Serializable {

    private Boolean isSuccessful;

    private Long pointsGained;

    private GodQuestResultBreakdown pointsBreakdown;

}
