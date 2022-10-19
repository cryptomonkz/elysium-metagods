package com.elysium.metagods.repository;

import com.elysium.metagods.domain.PendingTokenSpending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PendingTokenSpending entity.
 */
@Repository
public interface PendingTokenSpendingRepository extends JpaRepository<PendingTokenSpending, Long>, JpaSpecificationExecutor<PendingTokenSpending> {}
