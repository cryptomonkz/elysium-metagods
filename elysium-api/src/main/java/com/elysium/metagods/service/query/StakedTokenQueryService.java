package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.StakedToken_;
import com.elysium.metagods.repository.StakedTokenRepository;
import com.elysium.metagods.service.criteria.GodCriteria;
import com.elysium.metagods.service.criteria.StakedTokenCriteria;
import com.elysium.metagods.service.criteria.WalletCriteria;
import com.elysium.metagods.service.criteria.WeaponCriteria;
import com.elysium.metagods.service.dto.entity.StakedTokenDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import javax.validation.constraints.NotNull;
import java.util.List;

import static com.elysium.metagods.helper.JoinHelper.join;

/**
 * Service for executing complex queries for {@link StakedToken} entities in the database.
 * The main input is a {@link StakedTokenCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link StakedTokenDTO} or a {@link Page} of {@link StakedTokenDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class StakedTokenQueryService extends SpecificationService<StakedToken> {

    private final StakedTokenRepository stakedTokenRepository;

    /**
     * Return a {@link List} of {@link StakedTokenDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<StakedToken> findByCriteria(@NotNull StakedTokenCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<StakedToken> specification = createSpecification(criteria);
        return stakedTokenRepository.findAll(specification);
    }

    public long countByCriteria(@NotNull StakedTokenCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<StakedToken> specification = createSpecification(criteria);
        return stakedTokenRepository.count(specification);
    }

    private StakedTokenCriteria buildCriteriaForTokens(
            @NotNull ContractType contractType, @NotNull String address
    ) {
        StakedTokenCriteria criteria = new StakedTokenCriteria();
        WalletCriteria ownerFilter = WalletQueryService.buildCriteriaForOwner(address);
        switch (contractType) {
            case GOD:
                criteria.setGod(new GodCriteria().setOwner(ownerFilter));
                break;
            case WEAPON:
                criteria.setWeapon(new WeaponCriteria().setOwner(ownerFilter));
                break;
        }
        return criteria;
    }

    public List<StakedToken> findStakedTokens(
            @NotNull ContractType contractType, @NotNull String address
    ) {
        return findByCriteria(buildCriteriaForTokens(contractType, address));
    }

    public long countStakedTokens(
            @NotNull ContractType contractType, @NotNull String address
    ) {
        return countByCriteria(buildCriteriaForTokens(contractType, address));
    }

    /**
     * Function to convert {@link StakedTokenCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<StakedToken> createSpecification(StakedTokenCriteria criteria) {
        Specification<StakedToken> specification = buildStakedTokenSpecification(root -> root, criteria);
        if (criteria != null) {
            if (criteria.getGod() != null) {
                specification = specification.and(buildGodSpecificationWithDependencies(
                    root -> join(root, StakedToken_.god, JoinType.INNER),
                    criteria.getGod()
                ));
            }
            if (criteria.getWeapon() != null) {
                specification = specification.and(buildWeaponSpecificationWithDependencies(
                    root -> join(root, StakedToken_.weapon, JoinType.INNER),
                    criteria.getWeapon()
                ));
            }
            if (criteria.getPairedToken() != null) {
                specification = specification.and(buildStakedTokenSpecification(
                    root -> join(root, StakedToken_.pairedToken, JoinType.INNER),
                    criteria.getPairedToken()
                ));
            }
            if (criteria.getReversePairedToken() != null) {
                specification = specification.and(buildStakedTokenSpecification(
                    root -> join(root, StakedToken_.reversePairedToken, JoinType.INNER),
                    criteria.getReversePairedToken()
                ));
            }
        }
        return specification;
    }
}
