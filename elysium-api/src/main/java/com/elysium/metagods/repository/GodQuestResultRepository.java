package com.elysium.metagods.repository;

import com.elysium.metagods.domain.GodQuestResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the GodQuestResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GodQuestResultRepository extends JpaRepository<GodQuestResult, Long>, JpaSpecificationExecutor<GodQuestResult> {}
