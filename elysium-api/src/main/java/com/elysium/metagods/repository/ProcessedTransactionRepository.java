package com.elysium.metagods.repository;

import com.elysium.metagods.domain.ProcessedTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProcessedTransaction entity.
 */
@Repository
public interface ProcessedTransactionRepository
    extends JpaRepository<ProcessedTransaction, Long>, JpaSpecificationExecutor<ProcessedTransaction> {}
