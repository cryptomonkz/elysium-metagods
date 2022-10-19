package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxPurchaseHistoryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter cost;

    private LongFilter bundleId;

    private LongFilter walletId;

    private StringFilter walletAddress;

    private Boolean distinct;

    public LootBoxPurchaseHistoryCriteria(LootBoxPurchaseHistoryCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.cost = other.cost == null ? null : other.cost.copy();
        this.bundleId = other.bundleId == null ? null : other.bundleId.copy();
        this.walletId = other.walletId == null ? null : other.walletId.copy();
        this.walletAddress = other.walletAddress == null ? null : other.walletAddress.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxPurchaseHistoryCriteria copy() {
        return new LootBoxPurchaseHistoryCriteria(this);
    }


}
