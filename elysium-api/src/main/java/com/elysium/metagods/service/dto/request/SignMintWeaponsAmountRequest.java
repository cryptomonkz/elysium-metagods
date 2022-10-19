package com.elysium.metagods.service.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class SignMintWeaponsAmountRequest extends SignAmountRequest {
    @NotNull
    private String price;
    @NotNull
    private Long mintCount;
}
