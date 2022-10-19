package com.elysium.metagods.service.query;

import javax.persistence.criteria.JoinType;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.helper.JoinHelper.join;

import com.elysium.metagods.domain.GodQuest;
import com.elysium.metagods.domain.GodQuest_;
import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import com.elysium.metagods.repository.GodQuestRepository;
import com.elysium.metagods.service.criteria.GodCriteria;
import com.elysium.metagods.service.criteria.GodQuestCriteria;
import com.elysium.metagods.service.criteria.GodQuestCriteria.GodQuestStatusFilter;
import com.elysium.metagods.service.criteria.GodTournamentEnrollmentCriteria;
import com.elysium.metagods.service.criteria.TournamentCriteria;
import lombok.extern.slf4j.Slf4j;
import tech.jhipster.service.filter.LongFilter;

@Slf4j
@Service
@Transactional(readOnly = true)
public class GodQuestQueryService extends SpecificationService<GodQuest> {


    private final GodQuestRepository godQuestRepository;

    public GodQuestQueryService(GodQuestRepository godQuestRepository) {
        this.godQuestRepository = godQuestRepository;
    }

    @Transactional(readOnly = true)
    public List<GodQuest> findByCriteria(GodQuestCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<GodQuest> specification = createSpecification(criteria);
        return godQuestRepository.findAll(specification);
    }

    public static GodQuestCriteria getCurrentGodQuestsCriteria(Long godId, Long tournamentId) {

        GodQuestCriteria godQuestCriteria = getGodQuestCriteriaForGodIdAndTournamentId(godId, tournamentId);
        godQuestCriteria.setStatus(
            (GodQuestStatusFilter) new GodQuestStatusFilter().setIn(GodQuestStatus.getDisplayableQuests())
        );
        return godQuestCriteria;
    }

    public static GodQuestCriteria getCurrentAssignableGodQuestsCriteria(Long godId, Long tournamentId) {

        GodQuestCriteria godQuestCriteria = getGodQuestCriteriaForGodIdAndTournamentId(godId, tournamentId);
        godQuestCriteria.setStatus(
            (GodQuestStatusFilter) new GodQuestStatusFilter().setEquals(GodQuestStatus.ASSIGNABLE)
        );
        return godQuestCriteria;
    }

    public static GodQuestCriteria getAssignedQuestsBeforePeriodNumber(
        Long tournamentId,
        long questPeriodNumber
    ) {
        GodTournamentEnrollmentCriteria godEnrolledCriteria = new GodTournamentEnrollmentCriteria();
        godEnrolledCriteria.setTournament(
            new TournamentCriteria().setId(
                (LongFilter) new LongFilter().setEquals(tournamentId)
            )
        );
        GodQuestCriteria godQuestCriteria = new GodQuestCriteria();
        godQuestCriteria.setGodEnrolled(godEnrolledCriteria);
        godQuestCriteria.setPeriodNumber((LongFilter) new LongFilter().setLessThan(questPeriodNumber));
        godQuestCriteria.setStatus((GodQuestStatusFilter) new GodQuestStatusFilter().setEquals(GodQuestStatus.ASSIGNED));
        return godQuestCriteria;

    }

    protected Specification<GodQuest> createSpecification(GodQuestCriteria criteria) {
        Specification<GodQuest> specification = buildGodQuestSpecification(
            root -> root,
            criteria
        );
        if (criteria != null) {
            if (criteria.getGodEnrolled() != null) {
                specification = specification.and(buildGodTournamentEnrollmentSpecificationWithDependencies(
                    root -> join(root, GodQuest_.godEnrolled, JoinType.INNER),
                    criteria.getGodEnrolled()
                ));
            }
        }
        return specification;
    }

    private static GodQuestCriteria getGodQuestCriteriaForGodIdAndTournamentId(Long godId, Long tournamentId) {
        GodTournamentEnrollmentCriteria godEnrolledCriteria = new GodTournamentEnrollmentCriteria();
        godEnrolledCriteria.setGod(
            new GodCriteria().setId(
                (LongFilter) new LongFilter().setEquals(godId)
            )
        );
        godEnrolledCriteria.setTournament(
            new TournamentCriteria().setId(
                (LongFilter) new LongFilter().setEquals(tournamentId)
            )
        );


        GodQuestCriteria godQuestCriteria = new GodQuestCriteria();
        godQuestCriteria.setGodEnrolled(godEnrolledCriteria);
        return godQuestCriteria;
    }
}
