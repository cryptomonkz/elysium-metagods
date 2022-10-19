package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.LongFilter;

@Data
@NoArgsConstructor
@ParameterObject
@Accessors(chain = true)
public class TournamentCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private InstantFilter enrollmentStartTime;

    private InstantFilter enrollmentEndTime;

    private InstantFilter tournamentStartTime;

    private InstantFilter tournamentEndTime;

    private LongFilter enrollmentFee;

    private LongFilter totalFeesCollected;

    private Boolean distinct;

    public TournamentCriteria(TournamentCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.enrollmentStartTime = other.enrollmentStartTime == null ? null : other.enrollmentStartTime.copy();
        this.enrollmentEndTime = other.enrollmentEndTime == null ? null : other.enrollmentEndTime.copy();
        this.tournamentStartTime = other.tournamentStartTime == null ? null : other.tournamentStartTime.copy();
        this.tournamentEndTime = other.tournamentEndTime == null ? null : other.tournamentEndTime.copy();
        this.enrollmentFee = other.enrollmentFee == null ? null : other.enrollmentFee.copy();
        this.totalFeesCollected = other.totalFeesCollected == null ? null : other.totalFeesCollected.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TournamentCriteria copy() {
        return new TournamentCriteria(this);
    }
}
