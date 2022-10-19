package com.elysium.metagods.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBoxInGameTokenItem.
 */
@Entity
@Table(name = "loot_box_in_game_token_item")
@Data
@Accessors(chain = true)
public class LootBoxInGameTokenItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
}
