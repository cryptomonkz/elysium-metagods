package com.elysium.metagods.service.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StakePairingDTO {
    @NotNull
    private Long godId;

    @NotNull
    private Long weaponId;
}
