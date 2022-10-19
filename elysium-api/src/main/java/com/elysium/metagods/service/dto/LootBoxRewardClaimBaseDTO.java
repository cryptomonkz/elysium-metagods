package com.elysium.metagods.service.dto;

import com.elysium.metagods.service.constant.TokenStandard;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class LootBoxRewardClaimBaseDTO {
    private Long requestIdentifier;

    private TokenStandard tokenStandard;

    private String fromAddress;

    private String collectionAddress;

    private Long tokenId;

    private Long amount;

    public LootBoxRewardClaimBaseDTO copyValues(LootBoxRewardClaimBaseDTO claimBaseDTO) {
        this.requestIdentifier = claimBaseDTO.getRequestIdentifier();
        this.tokenStandard = claimBaseDTO.getTokenStandard();
        this.fromAddress = claimBaseDTO.getFromAddress();
        this.collectionAddress = claimBaseDTO.getCollectionAddress();
        this.tokenId = claimBaseDTO.getTokenId();
        this.amount = claimBaseDTO.getAmount();
        return this;
    }
}
