package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.LongFilter;

@Data
@NoArgsConstructor
@ParameterObject
@Accessors(chain = true)
public class GodTournamentEnrollmentCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter totalPoints;

    private GodCriteria god;

    private TournamentCriteria tournament;

    private Boolean distinct;

    public GodTournamentEnrollmentCriteria(GodTournamentEnrollmentCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.totalPoints = other.totalPoints == null ? null : other.totalPoints.copy();
        this.god = other.god == null ? null : other.god.copy();
        this.tournament = other.tournament == null ? null : other.tournament.copy();
        this.distinct = other.distinct;
    }

    @Override
    public GodTournamentEnrollmentCriteria copy() {
        return new GodTournamentEnrollmentCriteria(this);
    }

}
