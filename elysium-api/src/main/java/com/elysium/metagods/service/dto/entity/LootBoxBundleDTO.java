package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxBundle} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxBundleDTO implements Serializable {

    private Long id;

    private Long stock;

    private Long amount;

    private Long price;

    private String description;

    private String imageUrl;

    private LootBoxDTO lootBox;

}
