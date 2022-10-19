package com.elysium.metagods.service.criteria;

import com.elysium.metagods.domain.enumeration.Gemstone;
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
 * Criteria class for the {@link com.elysium.metagods.domain.Weapon} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /weapons?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class WeaponCriteria implements Serializable, Criteria {

    /**
     * Class for filtering Gemstone
     */
    @NoArgsConstructor
    public static class GemstoneFilter extends Filter<Gemstone> {

        public GemstoneFilter(GemstoneFilter filter) {
            super(filter);
        }

        @Override
        public GemstoneFilter copy() {
            return new GemstoneFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private Boolean distinct;

    private LongFilter id;

    private GemstoneFilter trait;

    private StakedTokenCriteria stakeData;

    private WalletCriteria owner;

    public WeaponCriteria(WeaponCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.trait = other.trait == null ? null : other.trait.copy();
        this.stakeData = other.stakeData == null ? null : other.stakeData.copy();
        this.owner = other.owner == null ? null : other.owner.copy();
    }

    @Override
    public WeaponCriteria copy() {
        return new WeaponCriteria(this);
    }

}
