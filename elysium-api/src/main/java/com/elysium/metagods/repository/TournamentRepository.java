package com.elysium.metagods.repository;

import java.util.Optional;

import com.elysium.metagods.domain.Tournament;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Tournament entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long>, JpaSpecificationExecutor<Tournament> {

    Optional<Tournament> findOneByActiveTrue();

    @Modifying
    @Query("UPDATE Tournament SET totalFeesCollected = totalFeesCollected + :enrollmentTax WHERE id = :id")
    void addAmountToTotalFeesCollected(Long id, long enrollmentTax);
}
