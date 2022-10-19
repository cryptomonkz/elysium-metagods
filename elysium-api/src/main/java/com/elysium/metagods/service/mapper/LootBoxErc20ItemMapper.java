package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxErc20Item;
import com.elysium.metagods.service.dto.entity.LootBoxErc20ItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBoxErc20Item} and its DTO {@link LootBoxErc20ItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxErc20ItemMapper extends EntityMapper<LootBoxErc20ItemDTO, LootBoxErc20Item> {}
