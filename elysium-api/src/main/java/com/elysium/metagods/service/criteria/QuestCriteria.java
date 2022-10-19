package com.elysium.metagods.service.criteria;

import java.io.Serializable;

import com.elysium.metagods.domain.enumeration.GodName;
import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@Data
@NoArgsConstructor
@ParameterObject
public class QuestCriteria implements Serializable, Criteria {

    /**
     * Class for filtering StakingMode
     */
    public static class StakingModeFilter extends Filter<StakingMode> {

        public StakingModeFilter() {}

        public StakingModeFilter(StakingModeFilter filter) {
            super(filter);
        }

        @Override
        public StakingModeFilter copy() {
            return new StakingModeFilter(this);
        }
    }

    /**
     * Class for filtering GodName
     */
    public static class GodNameFilter extends Filter<GodName> {

        public GodNameFilter() {}

        public GodNameFilter(GodNameFilter filter) {
            super(filter);
        }

        @Override
        public GodNameFilter copy() {
            return new GodNameFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter title;

    private StringFilter description;

    private StringFilter onSuccessDialogue;

    private StringFilter onFailDialogue;

    private StakingModeFilter stakingMode;

    private GodNameFilter bestSuitedGods;

    private GodNameFilter partiallySuitedGods;

    private Boolean distinct;

    public QuestCriteria(QuestCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.title = other.title == null ? null : other.title.copy();
        this.description = other.description == null ? null : other.description.copy();
        this.onSuccessDialogue = other.onSuccessDialogue == null ? null : other.onSuccessDialogue.copy();
        this.onFailDialogue = other.onFailDialogue == null ? null : other.onFailDialogue.copy();
        this.stakingMode = other.stakingMode == null ? null : other.stakingMode.copy();
        this.bestSuitedGods = other.bestSuitedGods == null ? null : other.bestSuitedGods.copy();
        this.partiallySuitedGods = other.partiallySuitedGods == null ? null : other.partiallySuitedGods.copy();
        this.distinct = other.distinct;
    }

    @Override
    public QuestCriteria copy() {
        return new QuestCriteria(this);
    }
}
