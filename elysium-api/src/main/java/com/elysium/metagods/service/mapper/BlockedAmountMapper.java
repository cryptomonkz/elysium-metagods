package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.service.dto.entity.BlockedAmountDTO;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link BlockedAmount} and its DTO {@link BlockedAmountDTO}.
 */
@Mapper(componentModel = "spring")
public interface BlockedAmountMapper extends EntityMapper<BlockedAmountDTO, BlockedAmount> {
    @Mapping(target = "wallet", source = "wallet", qualifiedByName = "walletId")
    BlockedAmountDTO toDto(BlockedAmount s);

    @Named("walletId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WalletDTO toDtoWalletId(Wallet wallet);
}
