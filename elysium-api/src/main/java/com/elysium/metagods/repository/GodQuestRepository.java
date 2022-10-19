package com.elysium.metagods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.GodQuest;
import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.enumeration.GodQuestStatus;

@SuppressWarnings("unused")
@Repository
public interface GodQuestRepository extends JpaRepository<GodQuest, Long>, JpaSpecificationExecutor<GodQuest> {

    @Modifying
    @Query(
        value = "update god_quest gq " +
                "set status = :toStatus " +
                "from god_tournament_enrollment gte " +
                "where gq.god_enrolled_id = gte.id " +
                "  and gq.period_number < :currentQuestPeriodNumber " +
                "  and gq.status = :fromStatus " +
                "  and gte.tournament_id = :tournamentId"
        ,
        nativeQuery = true
    )
    int changeQuestStatusBeforeQuestPeriodNumber(
        Long tournamentId,
        String fromStatus,
        String toStatus,
        long currentQuestPeriodNumber
    );

    long countAllByPeriodNumberAndGodEnrolled_Tournament(long currentQuestPeriodNumber, Tournament tournament);

    long countAllByStatusInAndGodEnrolled_Tournament(List<GodQuestStatus> statuses, Tournament tournament);
}
