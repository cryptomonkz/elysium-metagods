package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

import com.elysium.metagods.domain.enumeration.GodName;
import com.elysium.metagods.domain.enumeration.StakingMode;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

/**
 * A Quest.
 */
@Entity
@Table(name = "quest")
@Data
@Accessors(chain = true)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Quest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "questSequenceGenerator")
    @SequenceGenerator(
        name = "questSequenceGenerator",
        sequenceName = "quest_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "on_success_dialogue", nullable = false)
    private String onSuccessDialogue;

    @NotNull
    @Column(name = "on_fail_dialogue", nullable = false)
    private String onFailDialogue;

    @Enumerated(EnumType.STRING)
    @Column(name = "staking_mode")
    private StakingMode stakingMode;

    @Type(type = "jsonb")
    @Column(name = "best_suited_gods", columnDefinition = "jsonb")
    private Set<GodName> bestSuitedGods;

    @Type(type = "jsonb")
    @Column(name = "partially_suited_gods", columnDefinition = "jsonb")
    private Set<GodName> partiallySuitedGods;

    public boolean isWellSuited(God god) {
        return bestSuitedGods.contains(god.getName());
    }

    public boolean isPartiallySuited(God god) {
        return partiallySuitedGods.contains(god.getName());
    }
}
