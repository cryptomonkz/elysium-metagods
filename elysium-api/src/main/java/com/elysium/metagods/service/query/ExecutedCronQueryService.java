package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.ExecutedCron;
import com.elysium.metagods.domain.ExecutedCron_;
import com.elysium.metagods.domain.enumeration.CronType;
import com.elysium.metagods.repository.ExecutedCronRepository;
import com.elysium.metagods.service.criteria.ExecutedCronCriteria;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

/**
 * Service for executing complex queries for {@link ExecutedCron} entities in the database.
 * The main input is a {@link ExecutedCronCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class ExecutedCronQueryService extends SpecificationService<ExecutedCron> {

    private final ExecutedCronRepository executedCronRepository;

    /**
     * Return a {@link List} of {@link ExecutedCron} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public Page<ExecutedCron> findByCriteria(@NotNull ExecutedCronCriteria criteria, @NotNull Pageable page) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ExecutedCron> specification = createSpecification(criteria);
        return executedCronRepository.findAll(specification, page);
    }

    public Optional<ExecutedCron> findLatestCron(@NotNull CronType cronType) {
        var cronFilter = new ExecutedCronCriteria.CronTypeFilter().setEquals(cronType);
        var criteria = new ExecutedCronCriteria()
            .setCronType((ExecutedCronCriteria.CronTypeFilter) cronFilter);
        var pageRequest = PageRequest
            .of(0, 1, Sort.by(Sort.Direction.DESC, ExecutedCron_.END_BLOCK));
        return findByCriteria(criteria, pageRequest).stream().findFirst();
    }

    /**
     * Function to convert {@link ExecutedCronCriteria} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ExecutedCron> createSpecification(ExecutedCronCriteria criteria) {
        return buildExecutedCronSpecification(root -> root, criteria);
    }
}
