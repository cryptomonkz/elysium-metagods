package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxPurchaseHistory;
import com.elysium.metagods.repository.LootBoxPurchaseHistoryRepository;
import com.elysium.metagods.service.criteria.LootBoxPurchaseHistoryCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxPurchaseHistoryDTO;
import com.elysium.metagods.service.mapper.LootBoxPurchaseHistoryMapper;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link LootBoxPurchaseHistory} entities in the database.
 * The main input is a {@link LootBoxPurchaseHistoryCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxPurchaseHistoryDTO} or a {@link Page} of {@link LootBoxPurchaseHistoryDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxPurchaseHistoryQueryService extends QueryService<LootBoxPurchaseHistory> {

    private final LootBoxPurchaseHistoryRepository lootBoxPurchaseHistoryRepository;

    private final LootBoxPurchaseHistoryMapper lootBoxPurchaseHistoryMapper;

    public LootBoxPurchaseHistoryQueryService(
        LootBoxPurchaseHistoryRepository lootBoxPurchaseHistoryRepository,
        LootBoxPurchaseHistoryMapper lootBoxPurchaseHistoryMapper
    ) {
        this.lootBoxPurchaseHistoryRepository = lootBoxPurchaseHistoryRepository;
        this.lootBoxPurchaseHistoryMapper = lootBoxPurchaseHistoryMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxPurchaseHistoryDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxPurchaseHistoryDTO> findByCriteria(LootBoxPurchaseHistoryCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxPurchaseHistory> specification = createSpecification(criteria);
        return lootBoxPurchaseHistoryMapper.toDto(lootBoxPurchaseHistoryRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxPurchaseHistoryDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxPurchaseHistoryDTO> findByCriteria(LootBoxPurchaseHistoryCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxPurchaseHistory> specification = createSpecification(criteria);
        return lootBoxPurchaseHistoryRepository.findAll(specification, page).map(lootBoxPurchaseHistoryMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxPurchaseHistoryCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxPurchaseHistory> specification = createSpecification(criteria);
        return lootBoxPurchaseHistoryRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxPurchaseHistoryCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxPurchaseHistory> createSpecification(LootBoxPurchaseHistoryCriteria criteria) {
        Specification<LootBoxPurchaseHistory> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxPurchaseHistory_.id));
            }
            if (criteria.getCost() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCost(), LootBoxPurchaseHistory_.cost));
            }
            if (criteria.getBundleId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBundleId(), LootBoxPurchaseHistory_.bundleId));
            }
            if (criteria.getWalletId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getWalletId(), LootBoxPurchaseHistory_.walletId));
            }
            if (criteria.getWalletAddress() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getWalletAddress(), LootBoxPurchaseHistory_.walletAddress));
            }
        }
        return specification;
    }
}
