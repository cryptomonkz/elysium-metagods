package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.Weapon;
import com.elysium.metagods.repository.WeaponRepository;
import com.elysium.metagods.service.criteria.WeaponCriteria;
import com.elysium.metagods.service.dto.entity.WeaponDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Service for executing complex queries for {@link Weapon} entities in the database.
 * The main input is a {@link WeaponCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WeaponDTO} or a {@link Page} of {@link WeaponDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
public class WeaponQueryService extends SpecificationService<Weapon> {

    private final WeaponRepository weaponRepository;

    /**
     * Return a {@link List} of {@link WeaponDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<Weapon> findByCriteria(@NotNull WeaponCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Weapon> specification = createSpecification(criteria);
        return weaponRepository.findAll(specification);
    }

    public List<Weapon> findForOwner(@NotNull String address) {
        return findByCriteria(new WeaponCriteria().setOwner(WalletQueryService.buildCriteriaForOwner(address)));
    }

    /**
     * Function to convert {@link WeaponCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Weapon> createSpecification(WeaponCriteria criteria) {
        return buildWeaponSpecificationWithDependencies(root -> root, criteria);
    }
}
