package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.WalletTransferHistory;
import com.elysium.metagods.service.dto.entity.WalletTransferHistoryDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link WalletTransferHistory} and its DTO {@link WalletTransferHistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface WalletTransferHistoryMapper extends EntityMapper<WalletTransferHistoryDTO, WalletTransferHistory> {}
