package com.elysium.metagods.service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Accessors(chain = true)
public class LootBoxRewardClaimResponse extends LootBoxRewardClaimBaseDTO {
    private String signature;

    public LootBoxRewardClaimResponse setRewardClaimBase(LootBoxRewardClaimBaseDTO claimBaseDTO) {
        this.copyValues(claimBaseDTO);
        return this;
    }
}
