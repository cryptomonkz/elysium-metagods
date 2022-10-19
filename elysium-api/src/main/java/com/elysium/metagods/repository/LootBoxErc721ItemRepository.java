package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxErc721Item;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxErc721Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxErc721ItemRepository extends JpaRepository<LootBoxErc721Item, Long>, JpaSpecificationExecutor<LootBoxErc721Item> {}
