package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;

@Data
@NoArgsConstructor
@ParameterObject
public class GodQuestCriteria implements Serializable, Criteria {

    /**
     * Class for filtering GodQuestStatus
     */
    public static class GodQuestStatusFilter extends Filter<GodQuestStatus> {

        public GodQuestStatusFilter() {}

        public GodQuestStatusFilter(GodQuestStatusFilter filter) {
            super(filter);
        }

        @Override
        public GodQuestStatusFilter copy() {
            return new GodQuestStatusFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private GodQuestStatusFilter status;

    private LongFilter periodNumber;

    private LongFilter resultId;

    private LongFilter questId;

    private GodTournamentEnrollmentCriteria godEnrolled;

    private Boolean distinct;

    public GodQuestCriteria(GodQuestCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.status = other.status == null ? null : other.status.copy();
        this.periodNumber = other.periodNumber == null ? null : other.periodNumber.copy();
        this.resultId = other.resultId == null ? null : other.resultId.copy();
        this.questId = other.questId == null ? null : other.questId.copy();
        this.godEnrolled = other.godEnrolled == null ? null : other.godEnrolled.copy();
        this.distinct = other.distinct;
    }

    @Override
    public GodQuestCriteria copy() {
        return new GodQuestCriteria(this);
    }
}
