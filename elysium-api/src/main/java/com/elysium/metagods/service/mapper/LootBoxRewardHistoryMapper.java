package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxRewardHistory;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryBaseDTO;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link LootBoxRewardHistory} and its DTO {@link LootBoxRewardHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {LootBoxMapper.class, LootBoxItemMapper.class})
public interface LootBoxRewardHistoryMapper extends EntityMapper<LootBoxRewardHistoryDTO, LootBoxRewardHistory> {
    @Mapping(target = "lootBox", source = "lootBox")
    @Mapping(target = "owner", source = "owner")
    @Mapping(target = "reward", source = "reward")
    LootBoxRewardHistoryDTO toDto(LootBoxRewardHistory s);

    LootBoxRewardHistoryBaseDTO toBaseDto(LootBoxRewardHistory s);
}
