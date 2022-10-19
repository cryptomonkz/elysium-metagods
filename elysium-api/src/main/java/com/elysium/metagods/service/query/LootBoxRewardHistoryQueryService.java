package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxRewardHistory;
import com.elysium.metagods.repository.LootBoxRewardHistoryRepository;
import com.elysium.metagods.service.criteria.LootBoxRewardHistoryCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryDTO;
import com.elysium.metagods.service.mapper.LootBoxRewardHistoryMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;

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
 * Service for executing complex queries for {@link LootBoxRewardHistory} entities in the database.
 * The main input is a {@link LootBoxRewardHistoryCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxRewardHistoryDTO} or a {@link Page} of {@link LootBoxRewardHistoryDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxRewardHistoryQueryService extends QueryService<LootBoxRewardHistory> {

    private final LootBoxRewardHistoryRepository lootBoxRewardHistoryRepository;

    private final LootBoxRewardHistoryMapper lootBoxRewardHistoryMapper;

    public LootBoxRewardHistoryQueryService(
        LootBoxRewardHistoryRepository lootBoxRewardHistoryRepository,
        LootBoxRewardHistoryMapper lootBoxRewardHistoryMapper
    ) {
        this.lootBoxRewardHistoryRepository = lootBoxRewardHistoryRepository;
        this.lootBoxRewardHistoryMapper = lootBoxRewardHistoryMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxRewardHistoryDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxRewardHistoryDTO> findByCriteria(LootBoxRewardHistoryCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxRewardHistory> specification = createSpecification(criteria);
        return lootBoxRewardHistoryMapper.toDto(lootBoxRewardHistoryRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxRewardHistoryDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxRewardHistoryDTO> findByCriteria(LootBoxRewardHistoryCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxRewardHistory> specification = createSpecification(criteria);
        return lootBoxRewardHistoryRepository.findAll(specification, page).map(lootBoxRewardHistoryMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxRewardHistoryCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxRewardHistory> specification = createSpecification(criteria);
        return lootBoxRewardHistoryRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxRewardHistoryCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxRewardHistory> createSpecification(LootBoxRewardHistoryCriteria criteria) {
        Specification<LootBoxRewardHistory> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxRewardHistory_.id));
            }
            if (criteria.getLootBoxId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLootBoxId(),
                            root -> root.join(LootBoxRewardHistory_.lootBox, JoinType.LEFT).get(LootBox_.id)
                        )
                    );
            }
            if (criteria.getOwnerId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getOwnerId(),
                            root -> root.join(LootBoxRewardHistory_.owner, JoinType.LEFT).get(Wallet_.id)
                        )
                    );
            }
            if (criteria.getRewardId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getRewardId(),
                            root -> root.join(LootBoxRewardHistory_.reward, JoinType.LEFT).get(LootBoxItem_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
