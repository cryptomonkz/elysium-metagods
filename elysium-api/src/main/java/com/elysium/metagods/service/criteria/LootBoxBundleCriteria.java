package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxBundleCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter amount;

    private LongFilter price;

    private StringFilter description;

    private StringFilter imageUrl;

    private LongFilter lootBoxId;

    private Boolean distinct;

    public LootBoxBundleCriteria(LootBoxBundleCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.price = other.price == null ? null : other.price.copy();
        this.description = other.description == null ? null : other.description.copy();
        this.imageUrl = other.imageUrl == null ? null : other.imageUrl.copy();
        this.lootBoxId = other.lootBoxId == null ? null : other.lootBoxId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxBundleCriteria copy() {
        return new LootBoxBundleCriteria(this);
    }

}
