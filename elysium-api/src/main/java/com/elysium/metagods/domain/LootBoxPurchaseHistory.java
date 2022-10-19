package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

/**
 * A LootBoxPurchaseHistory.
 */
@Entity
@Table(name = "loot_box_purchase_history")
@Data
@Accessors(chain = true)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class LootBoxPurchaseHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxPurchaseHistorySequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxPurchaseHistorySequenceGenerator",
        sequenceName = "loot_box_purchase_history_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @Column(name = "cost")
    private Long cost;

    @Column(name = "bundle_id")
    private Long bundleId;

    @Column(name = "wallet_id")
    private Long walletId;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Type(type = "jsonb")
    @Column(name = "bundle_data", columnDefinition = "jsonb")
    private LootBoxBundleDTO bundleData;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
