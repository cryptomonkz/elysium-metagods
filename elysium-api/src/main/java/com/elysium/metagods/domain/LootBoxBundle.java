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
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * A LootBoxBundle.
 */
@Entity
@Data
@Accessors(chain = true)
@Table(name = "loot_box_bundle")
@ToString(exclude = {"lootBox"})
@EqualsAndHashCode(exclude = {"lootBox"})
public class LootBoxBundle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxBundleSequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxBundleSequenceGenerator",
        sequenceName = "loot_box_bundle_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @Column(name = "stock")
    private Long stock;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @NotNull
    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = { "bundles", "items" }, allowSetters = true)
    private LootBox lootBox;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public boolean hasStockLimit() {
        return stock != null;
    }

}
