package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;

@Data
@NoArgsConstructor
public class LootBoxRewardHistoryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter lootBoxId;

    private LongFilter ownerId;

    private LongFilter rewardId;

    private Boolean distinct;

    public LootBoxRewardHistoryCriteria(LootBoxRewardHistoryCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.lootBoxId = other.lootBoxId == null ? null : other.lootBoxId.copy();
        this.ownerId = other.ownerId == null ? null : other.ownerId.copy();
        this.rewardId = other.rewardId == null ? null : other.rewardId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxRewardHistoryCriteria copy() {
        return new LootBoxRewardHistoryCriteria(this);
    }

}
