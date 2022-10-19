package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBoxOwned.
 */
@Entity
@Table(name = "loot_box_owned")
@Data
@Accessors(chain = true)
public class LootBoxOwned implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxOwnedSequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxOwnedSequenceGenerator",
        sequenceName = "loot_box_owned_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "bundles", "items" }, allowSetters = true)
    private LootBox lootBox;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "gods", "weapons" }, allowSetters = true)
    private Wallet owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
