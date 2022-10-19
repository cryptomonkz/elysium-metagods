package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBox;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBox entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxRepository extends JpaRepository<LootBox, Long>, JpaSpecificationExecutor<LootBox> {}
