package com.elysium.metagods.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.domain.LootBoxOwned;
import com.elysium.metagods.domain.Wallet;

/**
 * Spring Data SQL repository for the LootBoxOwned entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxOwnedRepository extends JpaRepository<LootBoxOwned, Long>, JpaSpecificationExecutor<LootBoxOwned> {
    List<LootBoxOwned> findAllByOwnerAndAmountGreaterThan(Wallet wallet, Long amount);
    Optional<LootBoxOwned> findByOwnerAndLootBox(Wallet wallet, LootBox lootBox);

    @Modifying
    @Query("UPDATE LootBoxOwned SET amount = amount + :amount WHERE id = :id")
    void addAmountToLootBoxOwned(Long id, Long amount);

    @Modifying
    @Query("UPDATE LootBoxOwned SET amount = amount - :amount WHERE id = :id")
    void subtractAmountFromLootBoxOwned(Long id, Long amount);
}
