package com.elysium.metagods.repository;

import java.util.List;
import java.util.Optional;

import com.elysium.metagods.domain.TournamentLeaderboard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TournamentLeaderboard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentLeaderboardRepository extends
    JpaRepository<TournamentLeaderboard, Long>,
    JpaSpecificationExecutor<TournamentLeaderboard> {

    Optional<TournamentLeaderboard> findByGodId(Long godId);

    List<TournamentLeaderboard> findByWalletAddress(String walletAddress);
}
