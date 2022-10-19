package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.service.dto.entity.GodDTO;
import com.elysium.metagods.service.dto.entity.StakedTokenDTO;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link God} and its DTO {@link GodDTO}.
 */
@Mapper(componentModel = "spring")
public interface GodMapper extends EntityMapper<GodDTO, God> {
    @Mapping(target = "stakeData", source = "stakeData", qualifiedByName = "stakedTokenId")
    @Mapping(target = "owner", source = "owner", qualifiedByName = "walletId")
    GodDTO toDto(God s);

    @Named("stakedTokenId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StakedTokenDTO toDtoStakedTokenId(StakedToken stakedToken);

    @Named("walletId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WalletDTO toDtoWalletId(Wallet wallet);
}
