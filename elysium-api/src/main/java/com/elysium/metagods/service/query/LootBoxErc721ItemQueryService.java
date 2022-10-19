package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxErc721Item;
import com.elysium.metagods.repository.LootBoxErc721ItemRepository;
import com.elysium.metagods.service.criteria.LootBoxErc721ItemCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxErc721ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc721ItemMapper;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link LootBoxErc721Item} entities in the database.
 * The main input is a {@link LootBoxErc721ItemCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxErc721ItemDTO} or a {@link Page} of {@link LootBoxErc721ItemDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxErc721ItemQueryService extends QueryService<LootBoxErc721Item> {

    private final LootBoxErc721ItemRepository lootBoxErc721ItemRepository;

    private final LootBoxErc721ItemMapper lootBoxErc721ItemMapper;

    public LootBoxErc721ItemQueryService(
        LootBoxErc721ItemRepository lootBoxErc721ItemRepository,
        LootBoxErc721ItemMapper lootBoxErc721ItemMapper
    ) {
        this.lootBoxErc721ItemRepository = lootBoxErc721ItemRepository;
        this.lootBoxErc721ItemMapper = lootBoxErc721ItemMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxErc721ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxErc721ItemDTO> findByCriteria(LootBoxErc721ItemCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxErc721Item> specification = createSpecification(criteria);
        return lootBoxErc721ItemMapper.toDto(lootBoxErc721ItemRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxErc721ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc721ItemDTO> findByCriteria(LootBoxErc721ItemCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxErc721Item> specification = createSpecification(criteria);
        return lootBoxErc721ItemRepository.findAll(specification, page).map(lootBoxErc721ItemMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxErc721ItemCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxErc721Item> specification = createSpecification(criteria);
        return lootBoxErc721ItemRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxErc721ItemCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxErc721Item> createSpecification(LootBoxErc721ItemCriteria criteria) {
        Specification<LootBoxErc721Item> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxErc721Item_.id));
            }
            if (criteria.getFromAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getFromAddress(), LootBoxErc721Item_.fromAddress)
                );
            }
            if (criteria.getCollectionAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getCollectionAddress(), LootBoxErc721Item_.collectionAddress)
                );
            }
            if (criteria.getTokenId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTokenId(), LootBoxErc721Item_.tokenId));
            }
        }
        return specification;
    }
}
