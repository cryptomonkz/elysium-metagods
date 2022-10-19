package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LootBoxItemRouletteDTO implements Serializable {

    private String name;

    private String description;

    private String imageUrl;

}
