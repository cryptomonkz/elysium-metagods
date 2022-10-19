package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.ProcessedTransaction;
import com.elysium.metagods.domain.enumeration.ProcessingType;
import com.elysium.metagods.repository.ProcessedTransactionRepository;
import com.elysium.metagods.service.criteria.ProcessedTransactionCriteria;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.filter.StringFilter;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

/**
 * Service for executing complex queries for {@link ProcessedTransaction} entities in the database.
 * The main input is a {@link ProcessedTransactionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ProcessedTransaction} or a {@link Page} of {@link ProcessedTransaction} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class ProcessedTransactionQueryService extends SpecificationService<ProcessedTransaction> {

    private final ProcessedTransactionRepository processedTransactionRepository;

    /**
     * Return a {@link List} of {@link ProcessedTransaction} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public Optional<ProcessedTransaction> findOneByCriteria(@NotNull ProcessedTransactionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ProcessedTransaction> specification = createSpecification(criteria);
        return processedTransactionRepository.findOne(specification);
    }

    public Optional<ProcessedTransaction> findProcessedTransaction(
        @NotNull ProcessingType type, @NotNull String txnHash
    ) {
        var typeFilter = new ProcessedTransactionCriteria.ProcessingTypeFilter().setEquals(type);
        var criteria = new ProcessedTransactionCriteria()
            .setProcessingType((ProcessedTransactionCriteria.ProcessingTypeFilter) typeFilter)
            .setTxnHash((StringFilter) new StringFilter().setEquals(txnHash));
        return findOneByCriteria(criteria);
    }

    /**
     * Function to convert {@link ProcessedTransactionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ProcessedTransaction> createSpecification(ProcessedTransactionCriteria criteria) {
        return buildProcessedTransactionSpecification(root -> root, criteria);
    }
}
