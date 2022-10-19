package com.elysium.metagods.repository;

import com.elysium.metagods.domain.God;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the God entity.
 */
@Repository
public interface GodRepository extends JpaRepository<God, Long>, JpaSpecificationExecutor<God> {}
