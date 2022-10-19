package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBoxErc20Item.
 */
@Entity
@Table(name = "loot_box_erc_20_item")
@Data
@Accessors(chain = true)
public class LootBoxErc20Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @NotNull
    @Column(name = "from_address", nullable = false)
    private String fromAddress;

    @NotNull
    @Column(name = "collection_address", nullable = false)
    private String collectionAddress;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
