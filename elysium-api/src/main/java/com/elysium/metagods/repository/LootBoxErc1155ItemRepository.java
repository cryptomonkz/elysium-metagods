package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxErc1155Item;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxErc1155Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxErc1155ItemRepository
    extends JpaRepository<LootBoxErc1155Item, Long>, JpaSpecificationExecutor<LootBoxErc1155Item> {}
