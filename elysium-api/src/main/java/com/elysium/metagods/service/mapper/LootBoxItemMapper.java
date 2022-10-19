package com.elysium.metagods.service.mapper;

import java.util.List;

import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.domain.LootBoxErc1155Item;
import com.elysium.metagods.domain.LootBoxErc20Item;
import com.elysium.metagods.domain.LootBoxErc721Item;
import com.elysium.metagods.domain.LootBoxItem;
import com.elysium.metagods.service.dto.entity.LootBoxDTO;
import com.elysium.metagods.service.dto.entity.LootBoxErc1155ItemDTO;
import com.elysium.metagods.service.dto.entity.LootBoxErc20ItemDTO;
import com.elysium.metagods.service.dto.entity.LootBoxErc721ItemDTO;
import com.elysium.metagods.service.dto.entity.LootBoxItemDTO;
import com.elysium.metagods.service.dto.entity.LootBoxItemRouletteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBoxItem} and its DTO {@link LootBoxItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxItemMapper extends EntityMapper<LootBoxItemDTO, LootBoxItem> {
    @Mapping(target = "erc20Item", source = "erc20Item", qualifiedByName = "lootBoxErc20ItemId")
    @Mapping(target = "erc721Item", source = "erc721Item", qualifiedByName = "lootBoxErc721ItemId")
    @Mapping(target = "erc1155Item", source = "erc1155Item", qualifiedByName = "lootBoxErc1155ItemId")
    @Mapping(target = "lootBox", source = "lootBox", qualifiedByName = "lootBoxId")
    LootBoxItemDTO toDto(LootBoxItem s);

    LootBoxItemRouletteDTO toRouletteItemDto(LootBoxItem s);

    List<LootBoxItemRouletteDTO> toRouletteItemDto(List<LootBoxItem> s);

    @Named("lootBoxErc20ItemId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LootBoxErc20ItemDTO toDtoLootBoxErc20ItemId(LootBoxErc20Item lootBoxErc20Item);

    @Named("lootBoxErc721ItemId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LootBoxErc721ItemDTO toDtoLootBoxErc721ItemId(LootBoxErc721Item lootBoxErc721Item);

    @Named("lootBoxErc1155ItemId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LootBoxErc1155ItemDTO toDtoLootBoxErc1155ItemId(LootBoxErc1155Item lootBoxErc1155Item);

    @Named("lootBoxId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LootBoxDTO toDtoLootBoxId(LootBox lootBox);
}
