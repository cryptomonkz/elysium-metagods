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
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBoxRewardHistory.
 */
@Entity
@Table(name = "loot_box_reward_history")
@Data
@Accessors(chain = true)
public class LootBoxRewardHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxRewardHistorySequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxRewardHistorySequenceGenerator",
        sequenceName = "loot_box_reward_history_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "opened_on", nullable = false)
    private Instant openedOn;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "bundles", "items" }, allowSetters = true)
    private LootBox lootBox;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "gods", "weapons" }, allowSetters = true)
    private Wallet owner;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "erc20Item", "erc721Item", "erc1155Item", "lootBox" }, allowSetters = true)
    private LootBoxItem reward;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
