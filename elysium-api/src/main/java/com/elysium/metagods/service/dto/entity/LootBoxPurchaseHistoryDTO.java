package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxPurchaseHistory} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxPurchaseHistoryDTO implements Serializable {

    private Long id;

    private Long cost;

    private Long bundleId;

    private Long walletId;

    private String walletAddress;

    private LootBoxBundleDTO bundleData;

}
