package com.elysium.metagods.service.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class SignAmountRequest {
    @NotNull
    private String amount;
    @NotNull
    private String walletAddress;
    @NotNull
    private Long internalIdentifier;
    @NotNull
    private Long generationDate;
}
