package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.LootBoxOwned;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.service.dto.entity.LootBoxOwnedDTO;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link LootBoxOwned} and its DTO {@link LootBoxOwnedDTO}.
 */
@Mapper(componentModel = "spring", uses = LootBoxMapper.class)
public interface LootBoxOwnedMapper extends EntityMapper<LootBoxOwnedDTO, LootBoxOwned> {
    @Mapping(target = "lootBox", source = "lootBox")
    @Mapping(target = "owner", source = "owner", qualifiedByName = "walletId")
    LootBoxOwnedDTO toDto(LootBoxOwned s);

    @Named("walletId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WalletDTO toDtoWalletId(Wallet wallet);
}
