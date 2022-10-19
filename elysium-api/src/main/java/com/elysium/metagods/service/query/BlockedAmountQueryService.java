package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.BlockedAmount_;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.repository.BlockedAmountRepository;
import com.elysium.metagods.service.criteria.BlockedAmountCriteria;
import com.elysium.metagods.service.dto.entity.BlockedAmountDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import javax.validation.constraints.NotNull;
import java.util.List;

import static com.elysium.metagods.helper.JoinHelper.join;

/**
 * Service for executing complex queries for {@link BlockedAmount} entities in the database.
 * The main input is a {@link BlockedAmountCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link BlockedAmountDTO} or a {@link Page} of {@link BlockedAmountDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class BlockedAmountQueryService extends SpecificationService<BlockedAmount> {

    private final BlockedAmountRepository blockedAmountRepository;

    public static BlockedAmountCriteria buildCriteriaForReason(@NotNull BlockedAmountReason reason) {
        return new BlockedAmountCriteria()
            .setReason((BlockedAmountCriteria.BlockedAmountReasonFilter) new BlockedAmountCriteria
                .BlockedAmountReasonFilter().setEquals(reason));
    }

    /**
     * Return a {@link List} of {@link BlockedAmountDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<BlockedAmount> findByCriteria(BlockedAmountCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<BlockedAmount> specification = createSpecification(criteria);
        return blockedAmountRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link BlockedAmountDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    public Page<BlockedAmount> findByCriteria(BlockedAmountCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<BlockedAmount> specification = createSpecification(criteria);
        return blockedAmountRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    public long countByCriteria(BlockedAmountCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<BlockedAmount> specification = createSpecification(criteria);
        return blockedAmountRepository.count(specification);
    }

    /**
     * Function to convert {@link BlockedAmountCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<BlockedAmount> createSpecification(BlockedAmountCriteria criteria) {
        Specification<BlockedAmount> specification = buildBlockedAmountSpecification(root -> root, criteria);
        if (criteria != null) {
            if (criteria.getWallet() != null) {
                specification = specification.and(buildWalletSpecification(
                    root -> join(root, BlockedAmount_.wallet, JoinType.INNER),
                    criteria.getWallet()
                ));
            }
        }
        return specification;
    }
}
