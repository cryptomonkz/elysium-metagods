package com.elysium.metagods.repository;

import com.elysium.metagods.domain.BlockedAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the BlockedAmount entity.
 */
@Repository
public interface BlockedAmountRepository extends JpaRepository<BlockedAmount, Long>, JpaSpecificationExecutor<BlockedAmount> {}
