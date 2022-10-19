package com.elysium.metagods.repository;

import com.elysium.metagods.domain.ExecutedCron;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ExecutedCron entity.
 */
@Repository
public interface ExecutedCronRepository extends JpaRepository<ExecutedCron, Long>, JpaSpecificationExecutor<ExecutedCron> {}
