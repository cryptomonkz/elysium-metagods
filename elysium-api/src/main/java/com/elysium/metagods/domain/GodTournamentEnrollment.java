package com.elysium.metagods.domain;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import com.elysium.metagods.domain.enumeration.GodTournamentStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * A GodTournamentEnrollment.
 */
@Entity
@Table(name = "god_tournament_enrollment")
@Data
@Accessors(chain = true)
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
public class GodTournamentEnrollment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "godTournamentEnrollmentSequenceGenerator")
    @SequenceGenerator(
        name = "godTournamentEnrollmentSequenceGenerator",
        sequenceName = "god_tournament_enrollment_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "enrollment_date_time", nullable = false)
    private Instant enrollmentDateTime = Instant.now();

    @NotNull
    @Column(name = "total_points", nullable = false)
    private Long totalPoints;

    @NotNull
    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "stakeData", "owner", "tournamentEnrollments" }, allowSetters = true)
    private God god;

    @NotNull
    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "participants" }, allowSetters = true)
    private Tournament tournament;

    @OneToMany(mappedBy = "godEnrolled")
    @JsonIgnoreProperties(value = { "result", "quest", "godEnrolled" }, allowSetters = true)
    private Set<GodQuest> questsAssigned = new HashSet<>();

    public GodTournamentEnrollment(Tournament tournament, God god) {
        this.god = god;
        this.tournament = tournament;
        this.totalPoints = 0L;
    }

    public long getNumOfSuccessfulQuests() {
        return questsAssigned.stream()
                             .filter(godQuest -> GodQuestStatus.FINISHED.equals(godQuest.getStatus()))
                             .filter(godQuest -> godQuest.getResult().getIsSuccessful())
                             .count();
    }

    public GodTournamentStatus getGodTournamentStatus() {
        if (questsAssigned.stream().anyMatch(godQuest -> GodQuestStatus.ASSIGNED.equals(godQuest.getStatus()))) {
            return GodTournamentStatus.IN_QUEST;
        }
        if (questsAssigned.stream().anyMatch(godQuest -> GodQuestStatus.ASSIGNABLE.equals(godQuest.getStatus()))) {
            return GodTournamentStatus.AWAITS_QUEST;
        }
        return GodTournamentStatus.NO_QUEST;
    }

}
