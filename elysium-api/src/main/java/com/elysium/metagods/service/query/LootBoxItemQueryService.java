package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxItem;
import com.elysium.metagods.repository.LootBoxItemRepository;
import com.elysium.metagods.service.criteria.LootBoxItemCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxItemDTO;
import com.elysium.metagods.service.mapper.LootBoxItemMapper;
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
 * Service for executing complex queries for {@link LootBoxItem} entities in the database.
 * The main input is a {@link LootBoxItemCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxItemDTO} or a {@link Page} of {@link LootBoxItemDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxItemQueryService extends QueryService<LootBoxItem> {

    private final LootBoxItemRepository lootBoxItemRepository;

    private final LootBoxItemMapper lootBoxItemMapper;

    public LootBoxItemQueryService(LootBoxItemRepository lootBoxItemRepository, LootBoxItemMapper lootBoxItemMapper) {
        this.lootBoxItemRepository = lootBoxItemRepository;
        this.lootBoxItemMapper = lootBoxItemMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxItemDTO> findByCriteria(LootBoxItemCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxItem> specification = createSpecification(criteria);
        return lootBoxItemMapper.toDto(lootBoxItemRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxItemDTO> findByCriteria(LootBoxItemCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxItem> specification = createSpecification(criteria);
        return lootBoxItemRepository.findAll(specification, page).map(lootBoxItemMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxItemCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxItem> specification = createSpecification(criteria);
        return lootBoxItemRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxItemCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxItem> createSpecification(LootBoxItemCriteria criteria) {
        Specification<LootBoxItem> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxItem_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), LootBoxItem_.name));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), LootBoxItem_.description));
            }
            if (criteria.getImageUrl() != null) {
                specification = specification.and(buildStringSpecification(criteria.getImageUrl(), LootBoxItem_.imageUrl));
            }
            if (criteria.getIsOnChain() != null) {
                specification = specification.and(buildSpecification(criteria.getIsOnChain(), LootBoxItem_.isOnChain));
            }
            if (criteria.getErc20ItemId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getErc20ItemId(),
                            root -> root.join(LootBoxItem_.erc20Item, JoinType.LEFT).get(LootBoxErc20Item_.id)
                        )
                    );
            }
            if (criteria.getErc721ItemId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getErc721ItemId(),
                            root -> root.join(LootBoxItem_.erc721Item, JoinType.LEFT).get(LootBoxErc721Item_.id)
                        )
                    );
            }
            if (criteria.getErc1155ItemId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getErc1155ItemId(),
                            root -> root.join(LootBoxItem_.erc1155Item, JoinType.LEFT).get(LootBoxErc1155Item_.id)
                        )
                    );
            }
            if (criteria.getLootBoxId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getLootBoxId(), root -> root.join(LootBoxItem_.lootBox, JoinType.LEFT).get(LootBox_.id))
                    );
            }
        }
        return specification;
    }
}
