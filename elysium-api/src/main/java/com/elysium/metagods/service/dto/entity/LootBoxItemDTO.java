package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxItem} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxItemDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private Boolean isOnChain;

    private LootBoxErc20ItemDTO erc20Item;

    private LootBoxErc721ItemDTO erc721Item;

    private LootBoxErc1155ItemDTO erc1155Item;

    private LootBoxDTO lootBox;

}
