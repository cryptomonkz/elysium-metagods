package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxErc20Item;
import com.elysium.metagods.repository.LootBoxErc20ItemRepository;
import com.elysium.metagods.service.criteria.LootBoxErc20ItemCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxErc20ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc20ItemMapper;
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
 * Service for executing complex queries for {@link LootBoxErc20Item} entities in the database.
 * The main input is a {@link LootBoxErc20ItemCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxErc20ItemDTO} or a {@link Page} of {@link LootBoxErc20ItemDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxErc20ItemQueryService extends QueryService<LootBoxErc20Item> {

    private final LootBoxErc20ItemRepository lootBoxErc20ItemRepository;

    private final LootBoxErc20ItemMapper lootBoxErc20ItemMapper;

    public LootBoxErc20ItemQueryService(
        LootBoxErc20ItemRepository lootBoxErc20ItemRepository,
        LootBoxErc20ItemMapper lootBoxErc20ItemMapper
    ) {
        this.lootBoxErc20ItemRepository = lootBoxErc20ItemRepository;
        this.lootBoxErc20ItemMapper = lootBoxErc20ItemMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxErc20ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxErc20ItemDTO> findByCriteria(LootBoxErc20ItemCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxErc20Item> specification = createSpecification(criteria);
        return lootBoxErc20ItemMapper.toDto(lootBoxErc20ItemRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxErc20ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc20ItemDTO> findByCriteria(LootBoxErc20ItemCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxErc20Item> specification = createSpecification(criteria);
        return lootBoxErc20ItemRepository.findAll(specification, page).map(lootBoxErc20ItemMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxErc20ItemCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxErc20Item> specification = createSpecification(criteria);
        return lootBoxErc20ItemRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxErc20ItemCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxErc20Item> createSpecification(LootBoxErc20ItemCriteria criteria) {
        Specification<LootBoxErc20Item> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxErc20Item_.id));
            }
            if (criteria.getFromAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getFromAddress(), LootBoxErc20Item_.fromAddress)
                );
            }
            if (criteria.getCollectionAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getCollectionAddress(), LootBoxErc20Item_.collectionAddress)
                );
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), LootBoxErc20Item_.amount));
            }
        }
        return specification;
    }
}
