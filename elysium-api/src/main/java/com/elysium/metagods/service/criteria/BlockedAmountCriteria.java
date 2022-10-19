package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;

import java.io.Serializable;

/**
 * Criteria class for the {@link com.elysium.metagods.domain.BlockedAmount} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /blocked-amounts?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class BlockedAmountCriteria implements Serializable, Criteria {

    /**
     * Class for filtering BlockedAmountReason
     */
    @NoArgsConstructor
    public static class BlockedAmountReasonFilter extends Filter<BlockedAmountReason> {

        public BlockedAmountReasonFilter(BlockedAmountReasonFilter filter) {
            super(filter);
        }

        @Override
        public BlockedAmountReasonFilter copy() {
            return new BlockedAmountReasonFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private DoubleFilter amount;

    private BlockedAmountReasonFilter reason;

    private WalletCriteria wallet;

    public BlockedAmountCriteria(BlockedAmountCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.reason = other.reason == null ? null : other.reason.copy();
        this.wallet = other.wallet == null ? null : other.wallet.copy();
    }

    @Override
    public BlockedAmountCriteria copy() {
        return new BlockedAmountCriteria(this);
    }

}
