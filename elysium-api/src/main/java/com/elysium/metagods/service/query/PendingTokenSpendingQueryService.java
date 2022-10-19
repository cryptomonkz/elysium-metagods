package com.elysium.metagods.service.query;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import com.elysium.metagods.domain.PendingTokenSpending;
import com.elysium.metagods.domain.PendingTokenSpending_;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.repository.PendingTokenSpendingRepository;
import com.elysium.metagods.service.criteria.PendingTokenSpendingCriteria;
import com.elysium.metagods.service.dto.entity.PendingWithdrawalDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.filter.InstantFilter;

import javax.persistence.criteria.JoinType;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

import static com.elysium.metagods.helper.JoinHelper.join;

/**
 * Service for executing complex queries for {@link PendingTokenSpending} entities in the database.
 * The main input is a {@link PendingTokenSpendingCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PendingWithdrawalDTO} or a {@link Page} of {@link PendingWithdrawalDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PendingTokenSpendingQueryService extends SpecificationService<PendingTokenSpending> {

    private final ApplicationConfigurationProperties properties;
    private final PendingTokenSpendingRepository pendingTokenSpendingRepository;

    /**
     * Return a {@link List} of {@link PendingWithdrawalDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<PendingTokenSpending> findByCriteria(@NotNull PendingTokenSpendingCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PendingTokenSpending> specification = createSpecification(criteria);
        return pendingTokenSpendingRepository.findAll(specification);
    }

    public Instant getValidWithdrawalGenerationTime(@NotNull BlockedAmountReason reason) {
        switch (reason) {
            case WITHDRAW:
                return Instant.now()
                    .minusSeconds(properties.getWeb3().getWithdrawalLifetimeSeconds())
                    .minusSeconds(properties.getWeb3().getWithdrawalLifetimeReserveSeconds());
            case MINT_WEAPONS:
                return Instant.now()
                    .minusSeconds(properties.getWeb3().getWeaponMintLifetimeSeconds())
                    .minusSeconds(properties.getWeb3().getWeaponMintLifetimeReserveSeconds());
            default:
                throw new InvalidRequestException();
        }
    }

    public List<PendingTokenSpending> findExpiredPendingSpendings(@NotNull BlockedAmountReason reason) {
        var criteria = new PendingTokenSpendingCriteria()
            .setGenerationDate(new InstantFilter().setLessThanOrEqual(getValidWithdrawalGenerationTime(reason)))
            .setBlockedAmount(BlockedAmountQueryService.buildCriteriaForReason(reason));
        return findByCriteria(criteria);
    }

    /**
     * Function to convert {@link PendingTokenSpendingCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<PendingTokenSpending> createSpecification(PendingTokenSpendingCriteria criteria) {
        Specification<PendingTokenSpending> specification = buildPendingWithdrawalSpecification(root -> root, criteria);
        if (criteria != null) {
            if (criteria.getBlockedAmount() != null) {
                specification = specification.and(buildBlockedAmountSpecification(
                    root -> join(root, PendingTokenSpending_.blockedAmount, JoinType.INNER),
                    criteria.getBlockedAmount()
                ));
            }
        }
        return specification;
    }
}
