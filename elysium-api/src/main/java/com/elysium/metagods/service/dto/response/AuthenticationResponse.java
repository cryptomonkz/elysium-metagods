package com.elysium.metagods.service.dto.response;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@Accessors(chain = true)
public class AuthenticationResponse {
    @NotNull
    private String jwtToken;
    @NotNull
    private Instant tokenExpiration;
}
