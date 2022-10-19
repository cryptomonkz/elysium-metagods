package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.service.dto.entity.LootBoxDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBox} and its DTO {@link LootBoxDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxMapper extends EntityMapper<LootBoxDTO, LootBox> {}
