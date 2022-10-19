package com.elysium.metagods.domain;

import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.domain.enumeration.Gemstone;
import com.elysium.metagods.service.dto.request.ContractType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Weapon.
 */
@Entity
@Table(name = "weapon")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "trait"})
@EqualsAndHashCode(of = "id")
public class Weapon implements Serializable, TokenWithTrait {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "quest_bonus", nullable = false)
    private Long questBonus;

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

    public boolean hasOwner() {
        return owner != null;
    }

    public boolean isStaked() {
        return stakeData != null;
    }

    public boolean isPaired() {
        return stakeData != null && stakeData.getReversePairedToken() != null;
    }

    @Override
    public String getDisplayName() {
        return name;
    }

    @Override
    public ContractType getCollectionType() {
        return ContractType.WEAPON;
    }
}
