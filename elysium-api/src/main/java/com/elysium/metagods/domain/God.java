package com.elysium.metagods.domain;

import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.domain.enumeration.Gemstone;
import com.elysium.metagods.domain.enumeration.GodName;
import com.elysium.metagods.service.dto.request.ContractType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A God.
 */
@Entity
@Table(name = "god")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "trait"})
@EqualsAndHashCode(of = "id")
public class God implements Serializable, TokenWithTrait {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false)
    private GodName name;

    @Enumerated(EnumType.STRING)
    @Column(name = "trait")
    private Gemstone trait;

    @JsonIgnoreProperties(value = { "pairedToken", "god", "weapon", "reversePairedToken" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private StakedToken stakeData;

    @ManyToOne
    @JsonIgnoreProperties(value = { "gods", "weapons" }, allowSetters = true)
    private Wallet owner;

    @OneToMany(mappedBy = "god")
    @JsonIgnoreProperties(value = { "god", "tournament", "questsAssigned" }, allowSetters = true)
    private Set<GodTournamentEnrollment> tournamentEnrollments = new HashSet<>();

    public boolean isStaked() {
        return stakeData != null;
    }

    public boolean isPaired() {
        return stakeData != null && stakeData.getPairedToken() != null;
    }

    @Override
    public String getDisplayName() {
        return name.getDisplayName();
    }

    @Override
    public ContractType getCollectionType() {
        return ContractType.GOD;
    }
}
