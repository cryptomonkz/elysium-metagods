package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.repository.GodRepository;
import com.elysium.metagods.service.criteria.GodCriteria;
import com.elysium.metagods.service.dto.entity.GodDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Service for executing complex queries for {@link God} entities in the database.
 * The main input is a {@link GodCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link GodDTO} or a {@link Page} of {@link GodDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class GodQueryService extends SpecificationService<God> {

    private final GodRepository godRepository;

    public static GodCriteria buildCriteriaForOwner(@NotNull String address) {
        return new GodCriteria().setOwner(WalletQueryService.buildCriteriaForOwner(address));
    }

    /**
     * Return a {@link List} of {@link GodDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<God> findByCriteria(@NotNull GodCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<God> specification = createSpecification(criteria);
        return godRepository.findAll(specification);
    }

    public long countByCriteria(@NotNull GodCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<God> specification = createSpecification(criteria);
        return godRepository.count(specification);
    }

    public List<God> findForOwner(@NotNull String address) {
        return findByCriteria(buildCriteriaForOwner(address));
    }

    public long countTokens(@NotNull String address) {
        return countByCriteria(buildCriteriaForOwner(address));
    }

    /**
     * Function to convert {@link GodCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<God> createSpecification(GodCriteria criteria) {
        return buildGodSpecificationWithDependencies(root -> root, criteria);
    }
}
