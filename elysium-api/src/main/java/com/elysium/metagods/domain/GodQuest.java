package com.elysium.metagods.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Entity
@Table(name = "god_quest")
@Data
@Accessors(chain = true)
@EqualsAndHashCode(of = "id")
public class GodQuest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "godQuestSequenceGenerator")
    @SequenceGenerator(
        name = "godQuestSequenceGenerator",
        sequenceName = "god_quest_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GodQuestStatus status;

    @NotNull
    @Column(name = "period_number", nullable = false)
    private Long periodNumber;

    @NotNull
    @Column(name = "success_chance", nullable = false)
    private Integer successChance;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(unique = true)
    private GodQuestResult result;

    @NotNull
    @ManyToOne(optional = false)
    private Quest quest;

    @NotNull
    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = {"god", "tournament", "questsAssigned"}, allowSetters = true)
    private GodTournamentEnrollment godEnrolled;

    public Integer getRiskBonus() {
        return 100 - successChance;
    }
}
