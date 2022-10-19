package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxErc20ItemCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter fromAddress;

    private StringFilter collectionAddress;

    private LongFilter amount;

    private Boolean distinct;

    public LootBoxErc20ItemCriteria(LootBoxErc20ItemCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fromAddress = other.fromAddress == null ? null : other.fromAddress.copy();
        this.collectionAddress = other.collectionAddress == null ? null : other.collectionAddress.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxErc20ItemCriteria copy() {
        return new LootBoxErc20ItemCriteria(this);
    }

}
