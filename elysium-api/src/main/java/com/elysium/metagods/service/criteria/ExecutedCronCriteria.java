package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.ExecutedCron;
import com.elysium.metagods.domain.enumeration.CronType;
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
 * Criteria class for the {@link ExecutedCron} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /executed-crons?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class ExecutedCronCriteria implements Serializable, Criteria {

    /**
     * Class for filtering CronType
     */
    @NoArgsConstructor
    public static class CronTypeFilter extends Filter<CronType> {

        public CronTypeFilter(CronTypeFilter filter) {
            super(filter);
        }

        @Override
        public CronTypeFilter copy() {
            return new CronTypeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private CronTypeFilter cronType;

    private LongFilter startBlock;

    private LongFilter endBlock;

    private InstantFilter jobStartedAt;

    private InstantFilter jobEndedAt;

    public ExecutedCronCriteria(ExecutedCronCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.cronType = other.cronType == null ? null : other.cronType.copy();
        this.startBlock = other.startBlock == null ? null : other.startBlock.copy();
        this.endBlock = other.endBlock == null ? null : other.endBlock.copy();
        this.jobStartedAt = other.jobStartedAt == null ? null : other.jobStartedAt.copy();
        this.jobEndedAt = other.jobEndedAt == null ? null : other.jobEndedAt.copy();
    }

    @Override
    public ExecutedCronCriteria copy() {
        return new ExecutedCronCriteria(this);
    }

}
