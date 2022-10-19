package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxItemCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private StringFilter description;

    private StringFilter imageUrl;

    private BooleanFilter isOnChain;

    private LongFilter erc20ItemId;

    private LongFilter erc721ItemId;

    private LongFilter erc1155ItemId;

    private LongFilter lootBoxId;

    private Boolean distinct;

    public LootBoxItemCriteria(LootBoxItemCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.description = other.description == null ? null : other.description.copy();
        this.imageUrl = other.imageUrl == null ? null : other.imageUrl.copy();
        this.isOnChain = other.isOnChain == null ? null : other.isOnChain.copy();
        this.erc20ItemId = other.erc20ItemId == null ? null : other.erc20ItemId.copy();
        this.erc721ItemId = other.erc721ItemId == null ? null : other.erc721ItemId.copy();
        this.erc1155ItemId = other.erc1155ItemId == null ? null : other.erc1155ItemId.copy();
        this.lootBoxId = other.lootBoxId == null ? null : other.lootBoxId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxItemCriteria copy() {
        return new LootBoxItemCriteria(this);
    }

}
