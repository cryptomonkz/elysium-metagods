package com.elysium.metagods.service.criteria;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.elysium.metagods.domain.GodQuestResult} entity. This class is used
 * in {@link com.elysium.metagods.web.rest.GodQuestResultResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /god-quest-results?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@NoArgsConstructor
@ParameterObject
public class GodQuestResultCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private BooleanFilter isSuccessful;

    private LongFilter pointsGained;

    private Boolean distinct;

    public GodQuestResultCriteria(GodQuestResultCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.isSuccessful = other.isSuccessful == null ? null : other.isSuccessful.copy();
        this.pointsGained = other.pointsGained == null ? null : other.pointsGained.copy();
        this.distinct = other.distinct;
    }

    @Override
    public GodQuestResultCriteria copy() {
        return new GodQuestResultCriteria(this);
    }

}
