package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxBundle;
import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link LootBoxBundle} and its DTO {@link LootBoxBundleDTO}.
 */
@Mapper(componentModel = "spring", uses = {LootBoxMapper.class})
public interface LootBoxBundleMapper extends EntityMapper<LootBoxBundleDTO, LootBoxBundle> {
    @Mapping(target = "lootBox", source = "lootBox")
    LootBoxBundleDTO toDto(LootBoxBundle s);
}
