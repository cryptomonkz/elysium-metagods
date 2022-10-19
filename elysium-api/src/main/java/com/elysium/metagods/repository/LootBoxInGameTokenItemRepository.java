package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxInGameTokenItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxInGameTokenItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxInGameTokenItemRepository
    extends JpaRepository<LootBoxInGameTokenItem, Long>, JpaSpecificationExecutor<LootBoxInGameTokenItem> {}
