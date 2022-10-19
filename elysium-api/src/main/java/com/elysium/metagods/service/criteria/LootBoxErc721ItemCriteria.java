package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxErc721ItemCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter fromAddress;

    private StringFilter collectionAddress;

    private LongFilter tokenId;

    private Boolean distinct;

    public LootBoxErc721ItemCriteria(LootBoxErc721ItemCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fromAddress = other.fromAddress == null ? null : other.fromAddress.copy();
        this.collectionAddress = other.collectionAddress == null ? null : other.collectionAddress.copy();
        this.tokenId = other.tokenId == null ? null : other.tokenId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxErc721ItemCriteria copy() {
        return new LootBoxErc721ItemCriteria(this);
    }

}
