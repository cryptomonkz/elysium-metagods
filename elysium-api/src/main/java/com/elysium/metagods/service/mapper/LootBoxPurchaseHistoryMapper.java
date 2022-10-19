package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxPurchaseHistory;
import com.elysium.metagods.service.dto.entity.LootBoxPurchaseHistoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LootBoxPurchaseHistory} and its DTO {@link LootBoxPurchaseHistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface LootBoxPurchaseHistoryMapper extends EntityMapper<LootBoxPurchaseHistoryDTO, LootBoxPurchaseHistory> {}
