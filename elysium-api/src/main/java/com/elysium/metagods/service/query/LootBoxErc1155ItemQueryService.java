package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxErc1155Item;
import com.elysium.metagods.repository.LootBoxErc1155ItemRepository;
import com.elysium.metagods.service.criteria.LootBoxErc1155ItemCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxErc1155ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc1155ItemMapper;
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
 * Service for executing complex queries for {@link LootBoxErc1155Item} entities in the database.
 * The main input is a {@link LootBoxErc1155ItemCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxErc1155ItemDTO} or a {@link Page} of {@link LootBoxErc1155ItemDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxErc1155ItemQueryService extends QueryService<LootBoxErc1155Item> {

    private final LootBoxErc1155ItemRepository lootBoxErc1155ItemRepository;

    private final LootBoxErc1155ItemMapper lootBoxErc1155ItemMapper;

    public LootBoxErc1155ItemQueryService(
        LootBoxErc1155ItemRepository lootBoxErc1155ItemRepository,
        LootBoxErc1155ItemMapper lootBoxErc1155ItemMapper
    ) {
        this.lootBoxErc1155ItemRepository = lootBoxErc1155ItemRepository;
        this.lootBoxErc1155ItemMapper = lootBoxErc1155ItemMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxErc1155ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxErc1155ItemDTO> findByCriteria(LootBoxErc1155ItemCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxErc1155Item> specification = createSpecification(criteria);
        return lootBoxErc1155ItemMapper.toDto(lootBoxErc1155ItemRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxErc1155ItemDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc1155ItemDTO> findByCriteria(LootBoxErc1155ItemCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxErc1155Item> specification = createSpecification(criteria);
        return lootBoxErc1155ItemRepository.findAll(specification, page).map(lootBoxErc1155ItemMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxErc1155ItemCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxErc1155Item> specification = createSpecification(criteria);
        return lootBoxErc1155ItemRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxErc1155ItemCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxErc1155Item> createSpecification(LootBoxErc1155ItemCriteria criteria) {
        Specification<LootBoxErc1155Item> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxErc1155Item_.id));
            }
            if (criteria.getFromAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getFromAddress(), LootBoxErc1155Item_.fromAddress)
                );
            }
            if (criteria.getCollectionAddress() != null) {
                specification = specification.and(
                    buildStringSpecification(criteria.getCollectionAddress(), LootBoxErc1155Item_.collectionAddress)
                );
            }
            if (criteria.getTokenId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTokenId(), LootBoxErc1155Item_.tokenId));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), LootBoxErc1155Item_.amount));
            }
        }
        return specification;
    }
}
