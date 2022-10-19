package com.elysium.metagods.service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class MintWeaponsSignedResponse extends TokenSpendingSignedResponse {
    private Long mintCount;
    private String price;
}
