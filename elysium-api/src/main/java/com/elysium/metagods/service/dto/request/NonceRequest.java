package com.elysium.metagods.service.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class NonceRequest {
    @NotNull
    private String walletAddress;
}

