package com.elysium.metagods.repository;

import com.elysium.metagods.domain.LootBoxRewardHistory;
import com.elysium.metagods.domain.Wallet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LootBoxRewardHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxRewardHistoryRepository
    extends JpaRepository<LootBoxRewardHistory, Long>, JpaSpecificationExecutor<LootBoxRewardHistory> {

    Page<LootBoxRewardHistory> findAllByOwner(Wallet wallet, Pageable pageable);


}
