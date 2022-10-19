package com.elysium.metagods.service.dto.request;

import com.elysium.metagods.service.dto.LootBoxRewardClaimBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Accessors(chain = true)
public class SignLootBoxRewardClaimRequest extends LootBoxRewardClaimBaseDTO {
    private String walletAddress;

    public SignLootBoxRewardClaimRequest setRewardClaimBase(LootBoxRewardClaimBaseDTO claimBaseDTO) {
        this.copyValues(claimBaseDTO);
        return this;
    }
}
