package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;

@Data
@NoArgsConstructor
public class LootBoxOwnedCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter amount;

    private LongFilter lootBoxId;

    private WalletCriteria owner;

    private Boolean distinct;

    public LootBoxOwnedCriteria(LootBoxOwnedCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.lootBoxId = other.lootBoxId == null ? null : other.lootBoxId.copy();
        this.owner = other.owner == null ? null : other.owner.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxOwnedCriteria copy() {
        return new LootBoxOwnedCriteria(this);
    }

}
