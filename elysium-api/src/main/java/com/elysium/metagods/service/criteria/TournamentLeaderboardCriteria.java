package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
@ParameterObject
public class TournamentLeaderboardCriteria implements Serializable, Criteria {

    private LongFilter rank;

    private LongFilter godId;

    private StringFilter godName;

    private StringFilter walletAddress;

    private StringFilter walletNickname;

    private LongFilter totalPoints;

    private InstantFilter enrollmentDateTime;

    private Boolean distinct;

    public TournamentLeaderboardCriteria(TournamentLeaderboardCriteria other) {
        this.rank = other.rank == null ? null : other.rank.copy();
        this.godId = other.godId == null ? null : other.godId.copy();
        this.godName = other.godName == null ? null : other.godName.copy();
        this.walletAddress = other.walletAddress == null ? null : other.walletAddress.copy();
        this.walletNickname = other.walletNickname == null ? null : other.walletNickname.copy();
        this.totalPoints = other.totalPoints == null ? null : other.totalPoints.copy();
        this.enrollmentDateTime = other.enrollmentDateTime == null ? null : other.enrollmentDateTime.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TournamentLeaderboardCriteria copy() {
        return new TournamentLeaderboardCriteria(this);
    }
}
