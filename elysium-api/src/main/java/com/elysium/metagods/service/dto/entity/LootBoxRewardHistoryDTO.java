package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.time.Instant;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxRewardHistory} entity.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class LootBoxRewardHistoryDTO extends LootBoxRewardHistoryBaseDTO implements Serializable {

    private WalletDTO owner;

}
