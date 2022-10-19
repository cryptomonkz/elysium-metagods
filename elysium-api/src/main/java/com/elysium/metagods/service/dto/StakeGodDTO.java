package com.elysium.metagods.service.dto;

import javax.validation.constraints.NotNull;

import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StakeGodDTO {
    @NotNull
    private Long godId;

    @NotNull
    private StakingMode stakingMode;
}
