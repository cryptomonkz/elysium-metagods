package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Wallet} and its DTO {@link WalletDTO}.
 */
@Mapper(componentModel = "spring")
public interface WalletMapper extends EntityMapper<WalletDTO, Wallet> {}
