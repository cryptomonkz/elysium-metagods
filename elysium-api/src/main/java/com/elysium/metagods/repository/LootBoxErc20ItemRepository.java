package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxErc20Item;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxErc20Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxErc20ItemRepository extends JpaRepository<LootBoxErc20Item, Long>, JpaSpecificationExecutor<LootBoxErc20Item> {}
