package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

import com.elysium.metagods.service.dto.entity.LootBoxItemDTO;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

/**
 * A LootBoxRewardHistoryPool.
 */
@Entity
@Table(name = "loot_box_reward_history_pool")
@Data
@Accessors(chain = true)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class LootBoxRewardHistoryPool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "loot_box_reward_history_id")
    private Long id;

    @Type(type = "jsonb")
    @Column(name = "potential_rewards", columnDefinition = "jsonb")
    private List<LootBoxItemDTO> potentialRewards;

    @OneToOne
    @MapsId
    @JoinColumn(name = "loot_box_reward_history_id")
    private LootBoxRewardHistory rewardHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
