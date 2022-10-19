package com.elysium.metagods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.LootBoxItem;

/**
 * Spring Data SQL repository for the LootBoxItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxItemRepository extends JpaRepository<LootBoxItem, Long>, JpaSpecificationExecutor<LootBoxItem> {

    @Modifying
    @Query("UPDATE LootBoxItem SET amountAvailable = amountAvailable + :amount WHERE id = :id")
    void addToAmountAvailable(Long id, Long amount);

    @Modifying
    @Query("UPDATE LootBoxItem SET amountAvailable = amountAvailable - :amount WHERE id = :id")
    void subtractFromAmountAvailable(Long id, Long amount);

}
