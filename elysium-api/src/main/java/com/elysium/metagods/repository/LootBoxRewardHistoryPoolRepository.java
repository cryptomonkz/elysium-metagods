package com.elysium.metagods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.LootBoxRewardHistoryPool;

/**
 * Spring Data SQL repository for the LootBoxRewardHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LootBoxRewardHistoryPoolRepository
    extends JpaRepository<LootBoxRewardHistoryPool, Long>, JpaSpecificationExecutor<LootBoxRewardHistoryPool> {}
