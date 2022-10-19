package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBoxItem.
 */
@Entity
@Table(name = "loot_box_item")
@Data
@Accessors(chain = true)
public class LootBoxItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxItemSequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxItemSequenceGenerator",
        sequenceName = "loot_box_item_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @NotNull
    @Column(name = "amount_available", nullable = false)
    private Long amountAvailable;

    @NotNull
    @Column(name = "weight", nullable = false)
    private Long weight;

    @NotNull
    @Column(name = "is_on_chain", nullable = false)
    private Boolean isOnChain;

    @OneToOne
    @JoinColumn(unique = true)
    private LootBoxInGameTokenItem inGameTokenItem;

    @OneToOne
    @JoinColumn(unique = true)
    private LootBoxErc20Item erc20Item;

    @OneToOne
    @JoinColumn(unique = true)
    private LootBoxErc721Item erc721Item;

    @OneToOne
    @JoinColumn(unique = true)
    private LootBoxErc1155Item erc1155Item;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "bundles", "items" }, allowSetters = true)
    private LootBox lootBox;

    // jhipster-needle-entity-add-field - JHipster will add fields here
}
