package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.enumeration.ProcessingType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

import java.io.Serializable;

/**
 * Criteria class for the {@link com.elysium.metagods.domain.ProcessedTransaction} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /processed-transactions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class ProcessedTransactionCriteria implements Serializable, Criteria {

    /**
     * Class for filtering ProcessingType
     */
    @NoArgsConstructor
    public static class ProcessingTypeFilter extends Filter<ProcessingType> {

        public ProcessingTypeFilter(ProcessingTypeFilter filter) {
            super(filter);
        }

        @Override
        public ProcessingTypeFilter copy() {
            return new ProcessingTypeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private ProcessingTypeFilter processingType;

    private StringFilter txnHash;

    public ProcessedTransactionCriteria(ProcessedTransactionCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.processingType = other.processingType == null ? null : other.processingType.copy();
        this.txnHash = other.txnHash == null ? null : other.txnHash.copy();
    }

    @Override
    public ProcessedTransactionCriteria copy() {
        return new ProcessedTransactionCriteria(this);
    }

}
