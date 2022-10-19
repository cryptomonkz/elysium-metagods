package com.elysium.metagods.repository;

import com.elysium.metagods.domain.StakedToken;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the StakedToken entity.
 */
@Repository
public interface StakedTokenRepository extends JpaRepository<StakedToken, Long>, JpaSpecificationExecutor<StakedToken> {}
