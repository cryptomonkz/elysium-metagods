package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxErc721Item;
import com.elysium.metagods.service.dto.entity.LootBoxErc721ItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBoxErc721Item} and its DTO {@link LootBoxErc721ItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxErc721ItemMapper extends EntityMapper<LootBoxErc721ItemDTO, LootBoxErc721Item> {}
