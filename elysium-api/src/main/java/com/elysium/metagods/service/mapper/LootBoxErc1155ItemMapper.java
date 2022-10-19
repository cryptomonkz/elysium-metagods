package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxErc1155Item;
import com.elysium.metagods.service.dto.entity.LootBoxErc1155ItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBoxErc1155Item} and its DTO {@link LootBoxErc1155ItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxErc1155ItemMapper extends EntityMapper<LootBoxErc1155ItemDTO, LootBoxErc1155Item> {}
