package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.PendingTokenSpending;
import com.elysium.metagods.service.dto.entity.BlockedAmountDTO;
import com.elysium.metagods.service.dto.entity.PendingWithdrawalDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link PendingTokenSpending} and its DTO {@link PendingWithdrawalDTO}.
 */
@Mapper(componentModel = "spring")
public interface PendingWithdrawalMapper extends EntityMapper<PendingWithdrawalDTO, PendingTokenSpending> {
    @Mapping(target = "blockedAmount", source = "blockedAmount", qualifiedByName = "blockedAmountId")
    PendingWithdrawalDTO toDto(PendingTokenSpending s);

    @Named("blockedAmountId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BlockedAmountDTO toDtoBlockedAmountId(BlockedAmount blockedAmount);
}
