package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.time.Instant;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxRewardHistory} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxRewardHistoryBaseDTO implements Serializable {

    private Long id;

    private Instant openedOn;

    private LootBoxDTO lootBox;

    private LootBoxItemDTO reward;

}
