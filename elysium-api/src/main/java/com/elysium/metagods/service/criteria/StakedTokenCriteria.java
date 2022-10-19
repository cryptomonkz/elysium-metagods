package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;

import java.io.Serializable;

/**
 * Criteria class for the {@link com.elysium.metagods.domain.StakedToken} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /staked-tokens?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class StakedTokenCriteria implements Serializable, Criteria {

    /**
     * Class for filtering StakingMode
     */
    @NoArgsConstructor
    public static class StakingModeFilter extends Filter<StakingMode> {

        public StakingModeFilter(StakingModeFilter filter) {
            super(filter);
        }

        @Override
        public StakingModeFilter copy() {
            return new StakingModeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private StakingModeFilter mode;

    private LongFilter lastClaimedOn;

    private GodCriteria god;

    private WeaponCriteria weapon;

    private StakedTokenCriteria pairedToken;

    private StakedTokenCriteria reversePairedToken;

    public StakedTokenCriteria(StakedTokenCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.mode = other.mode == null ? null : other.mode.copy();
        this.lastClaimedOn = other.lastClaimedOn == null ? null : other.lastClaimedOn.copy();
        this.god = other.god == null ? null : other.god.copy();
        this.weapon = other.weapon == null ? null : other.weapon.copy();
        this.pairedToken = other.pairedToken == null ? null : other.pairedToken.copy();
        this.reversePairedToken = other.reversePairedToken == null ? null : other.reversePairedToken.copy();
    }

    @Override
    public StakedTokenCriteria copy() {
        return new StakedTokenCriteria(this);
    }

}
