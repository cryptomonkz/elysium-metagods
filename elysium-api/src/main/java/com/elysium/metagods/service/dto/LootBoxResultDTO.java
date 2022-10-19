package com.elysium.metagods.service.dto;

import java.util.List;

import com.elysium.metagods.service.dto.entity.LootBoxItemRouletteDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class LootBoxResultDTO {

    private Long wonItemIndex;

    private List<LootBoxItemRouletteDTO> rouletteItems;

}
