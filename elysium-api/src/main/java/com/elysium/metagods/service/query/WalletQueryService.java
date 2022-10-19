package com.elysium.metagods.service.query;

import javax.validation.constraints.NotNull;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.repository.WalletRepository;
import com.elysium.metagods.service.criteria.WalletCriteria;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import com.elysium.metagods.service.filter.StringCaseInsensitiveFilter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service for executing complex queries for {@link Wallet} entities in the database.
 * The main input is a {@link WalletCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WalletDTO} or a {@link Page} of {@link WalletDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class WalletQueryService extends SpecificationService<Wallet> {

    private final WalletRepository walletRepository;

    /**
     * Return a {@link List} of {@link WalletDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    public List<Wallet> findByCriteria(WalletCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Wallet> specification = createSpecification(criteria);
        return walletRepository.findAll(specification);
    }

    public static WalletCriteria buildCriteriaForOwner(@NotNull String address) {
        StringCaseInsensitiveFilter addressFilter =
            (StringCaseInsensitiveFilter) new StringCaseInsensitiveFilter().setEquals(address);
        return new WalletCriteria().setAddress(addressFilter);
    }

    /**
     * Function to convert {@link WalletCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Wallet> createSpecification(WalletCriteria criteria) {
        return buildWalletSpecification(root -> root, criteria);
    }
}
