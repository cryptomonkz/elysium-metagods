package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
public class LootBoxCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private StringFilter description;

    private StringFilter imageUrl;

    private LongFilter bundlesId;

    private LongFilter itemsId;

    private Boolean distinct;

    public LootBoxCriteria(LootBoxCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.description = other.description == null ? null : other.description.copy();
        this.imageUrl = other.imageUrl == null ? null : other.imageUrl.copy();
        this.bundlesId = other.bundlesId == null ? null : other.bundlesId.copy();
        this.itemsId = other.itemsId == null ? null : other.itemsId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LootBoxCriteria copy() {
        return new LootBoxCriteria(this);
    }

}
