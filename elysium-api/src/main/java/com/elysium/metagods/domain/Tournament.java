package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import static com.elysium.metagods.config.ApplicationConfigurationConstant.TOURNAMENT_PRIZE_POOL_PERCENTAGE;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vladmihalcea.hibernate.type.interval.PostgreSQLIntervalType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.TypeDef;

/**
 * A Tournament.
 */
@Entity
@Table(name = "tournament")
@Data
@Accessors(chain = true)
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
@TypeDef(
    typeClass = PostgreSQLIntervalType.class,
    defaultForType = Duration.class
)
public class Tournament implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tournamentSequenceGenerator")
    @SequenceGenerator(
        name = "tournamentSequenceGenerator",
        sequenceName = "tournament_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull
    @Column(name = "tournament_number", nullable = false)
    private Long tournamentNumber;

    @NotNull
    @Column(name = "enrollment_start_time", nullable = false)
    private Instant enrollmentStartTime;

    @NotNull
    @Column(name = "enrollment_end_time", nullable = false)
    private Instant enrollmentEndTime;

    @NotNull
    @Column(name = "tournament_start_time", nullable = false)
    private Instant tournamentStartTime;

    @NotNull
    @Column(name = "tournament_end_time", nullable = false)
    private Instant tournamentEndTime;

    @NotNull
    @Column(name = "quests_assigning_frequency", nullable = false)
    private Duration questsAssigningFrequency;

    @NotNull
    @Column(name = "base_quest_points_reward", nullable = false)
    private Long baseQuestPointsReward;

    @NotNull
    @Column(name = "quest_well_suited_god_bonus_percentage", nullable = false)
    private Long questWellSuitedGodBonusPercentage;

    @NotNull
    @Column(name = "quest_partially_suited_god_bonus_percentage", nullable = false)
    private Long questPartiallySuitedGodBonusPercentage;

    @NotNull
    @Column(name = "quest_primordial_bonus", nullable = false)
    private Long questPrimordialBonus;

    @NotNull
    @Column(name = "enrollment_fee", nullable = false)
    private Long enrollmentFee;

    @NotNull
    @Column(name = "total_fees_collected", nullable = false)
    private Long totalFeesCollected;

    @OneToMany(mappedBy = "tournament")
    @JsonIgnoreProperties(value = {"god", "tournament", "questsAssigneds"}, allowSetters = true)
    private Set<GodTournamentEnrollment> participants = new HashSet<>();

    public boolean isEnrollmentWindowOpen() {
        Instant currentTime = Instant.now();
        return currentTime.isAfter(enrollmentStartTime) && currentTime.isBefore(enrollmentEndTime);
    }

    public long getCurrentQuestPeriodNumber() {
        return 1 + Duration.between(tournamentStartTime, Instant.now())
                           .dividedBy(questsAssigningFrequency);
    }

    public long getPrizePool() {
        return totalFeesCollected * TOURNAMENT_PRIZE_POOL_PERCENTAGE / 100;
    }
}
