package com.elysium.metagods.service.dto.response;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@Accessors(chain = true)
public class NonceResponse {
    @NotNull
    private Long nonce;
}
