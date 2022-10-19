package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxBundle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxBundle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxBundleRepository extends JpaRepository<LootBoxBundle, Long>, JpaSpecificationExecutor<LootBoxBundle> {

    @Modifying
    @Query("UPDATE LootBoxBundle SET stock = stock - :amount WHERE id = :id")
    void subtractStockFromLootBoxBundle(Long id, Long amount);

}
