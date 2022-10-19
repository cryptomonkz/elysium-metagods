package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.PendingTokenSpending;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.LongFilter;

import java.io.Serializable;

/**
 * Criteria class for the {@link PendingTokenSpending} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class PendingTokenSpendingCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private InstantFilter generationDate;

    private BlockedAmountCriteria blockedAmount;

    public PendingTokenSpendingCriteria(PendingTokenSpendingCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.generationDate = other.generationDate == null ? null : other.generationDate.copy();
        this.blockedAmount = other.blockedAmount == null ? null : other.blockedAmount.copy();
    }

    @Override
    public PendingTokenSpendingCriteria copy() {
        return new PendingTokenSpendingCriteria(this);
    }

}
