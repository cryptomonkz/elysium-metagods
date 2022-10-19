package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.Weapon;
import com.elysium.metagods.service.dto.entity.StakedTokenDTO;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import com.elysium.metagods.service.dto.entity.WeaponDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Weapon} and its DTO {@link WeaponDTO}.
 */
@Mapper(componentModel = "spring")
public interface WeaponMapper extends EntityMapper<WeaponDTO, Weapon> {
    @Mapping(target = "stakeData", source = "stakeData", qualifiedByName = "stakedTokenId")
    @Mapping(target = "owner", source = "owner", qualifiedByName = "walletId")
    WeaponDTO toDto(Weapon s);

    @Named("stakedTokenId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StakedTokenDTO toDtoStakedTokenId(StakedToken stakedToken);

    @Named("walletId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WalletDTO toDtoWalletId(Wallet wallet);
}
