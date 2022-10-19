package com.elysium.metagods.repository;

import com.elysium.metagods.domain.TournamentRewardDistributed;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TournamentRewardDistributed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentRewardDistributedRepository extends JpaRepository<TournamentRewardDistributed, Long> {}
