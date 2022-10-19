package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBoxErc20Item} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxErc20ItemDTO implements Serializable {

    private Long id;

    private String fromAddress;

    private String collectionAddress;

    private Long amount;

}
