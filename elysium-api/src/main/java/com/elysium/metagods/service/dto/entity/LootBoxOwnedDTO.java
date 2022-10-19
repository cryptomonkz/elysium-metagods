package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxOwned} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxOwnedDTO implements Serializable {

    private Long id;

    private Long amount;

    private LootBoxDTO lootBox;

    private WalletDTO owner;

}
