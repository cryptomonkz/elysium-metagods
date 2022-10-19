package com.elysium.metagods.repository;

import com.elysium.metagods.domain.WalletTransferHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WalletTransferHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WalletTransferHistoryRepository extends
    JpaRepository<WalletTransferHistory, Long>,
    JpaSpecificationExecutor<WalletTransferHistory> {
}
