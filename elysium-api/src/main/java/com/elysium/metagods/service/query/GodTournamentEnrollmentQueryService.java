package com.elysium.metagods.service.query;

import javax.persistence.criteria.JoinType;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.helper.JoinHelper.join;

import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.GodTournamentEnrollment_;
import com.elysium.metagods.repository.GodTournamentEnrollmentRepository;
import com.elysium.metagods.service.criteria.GodCriteria;
import com.elysium.metagods.service.criteria.GodTournamentEnrollmentCriteria;
import com.elysium.metagods.service.criteria.TournamentCriteria;
import com.elysium.metagods.service.criteria.WalletCriteria;
import lombok.extern.slf4j.Slf4j;
import tech.jhipster.service.filter.LongFilter;


@Slf4j
@Service
@Transactional(readOnly = true)
public class GodTournamentEnrollmentQueryService extends SpecificationService<GodTournamentEnrollment> {

    private final GodTournamentEnrollmentRepository godTournamentEnrollmentRepository;

    public GodTournamentEnrollmentQueryService(
        GodTournamentEnrollmentRepository godTournamentEnrollmentRepository
    ) {
        this.godTournamentEnrollmentRepository = godTournamentEnrollmentRepository;
    }

    @Transactional(readOnly = true)
    public List<GodTournamentEnrollment> findByCriteria(GodTournamentEnrollmentCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<GodTournamentEnrollment> specification = createSpecification(criteria);
        return godTournamentEnrollmentRepository.findAll(specification);
    }

    public List<GodTournamentEnrollment> findEnrolledGods(String address, Long tournamentId) {
        WalletCriteria ownerFilter = WalletQueryService.buildCriteriaForOwner(address);
        TournamentCriteria tournamentFilter = new TournamentCriteria().setId(
            (LongFilter) new LongFilter().setEquals(tournamentId)
        );
        GodTournamentEnrollmentCriteria criteria = new GodTournamentEnrollmentCriteria()
            .setGod(new GodCriteria().setOwner(ownerFilter))
            .setTournament(tournamentFilter);
        return findByCriteria(criteria);
    }

    protected Specification<GodTournamentEnrollment> createSpecification(GodTournamentEnrollmentCriteria criteria) {
        return buildGodTournamentEnrollmentSpecificationWithDependencies(
            root -> root,
            criteria
        );
    }
}
