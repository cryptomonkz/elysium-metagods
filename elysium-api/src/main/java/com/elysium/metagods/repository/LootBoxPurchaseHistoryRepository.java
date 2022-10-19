package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxPurchaseHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxPurchaseHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxPurchaseHistoryRepository
    extends JpaRepository<LootBoxPurchaseHistory, Long>, JpaSpecificationExecutor<LootBoxPurchaseHistory> {}
