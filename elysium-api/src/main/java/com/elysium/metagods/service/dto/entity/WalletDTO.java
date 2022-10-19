package com.elysium.metagods.service.dto.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.elysium.metagods.domain.Wallet} entity.
 */
@Data
@ToString
@EqualsAndHashCode(of = "id")
public class WalletDTO implements Serializable {

    private Long id;

    @NotNull
    private String address;

    private String nickname;

    private Double tokenBalance;

    private Long nonce;

    private Instant nonceGenerationDate;

}
