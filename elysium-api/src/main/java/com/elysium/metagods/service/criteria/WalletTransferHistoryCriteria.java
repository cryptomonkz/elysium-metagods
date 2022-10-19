package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class WalletTransferHistoryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter fromAddress;

    private StringFilter toAddress;

    private LongFilter amount;

    private Boolean distinct;

    public WalletTransferHistoryCriteria(WalletTransferHistoryCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fromAddress = other.fromAddress == null ? null : other.fromAddress.copy();
        this.toAddress = other.toAddress == null ? null : other.toAddress.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.distinct = other.distinct;
    }

    @Override
    public WalletTransferHistoryCriteria copy() {
        return new WalletTransferHistoryCriteria(this);
    }
}
