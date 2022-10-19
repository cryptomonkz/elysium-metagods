package com.elysium.metagods.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.Tournament;

@SuppressWarnings("unused")
@Repository
public interface GodTournamentEnrollmentRepository extends
    JpaRepository<GodTournamentEnrollment, Long>,
    JpaSpecificationExecutor<GodTournamentEnrollment> {

    Optional<GodTournamentEnrollment> findOneByTournamentAndGodId(Tournament tournament, Long godId);

    List<GodTournamentEnrollment> findAllByTournamentId(Long tournamentId);

    @Modifying
    @Query("UPDATE GodTournamentEnrollment SET totalPoints = totalPoints + :pointsGained WHERE id = :godEnrollmentId")
    void addPoints(Long godEnrollmentId, Long pointsGained);
}
