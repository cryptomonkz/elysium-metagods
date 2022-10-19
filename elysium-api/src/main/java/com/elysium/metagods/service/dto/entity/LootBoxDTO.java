package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A DTO for the {@link com.elysium.metagods.domain.LootBox} entity.
 */
@Data
@NoArgsConstructor
public class LootBoxDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

}
