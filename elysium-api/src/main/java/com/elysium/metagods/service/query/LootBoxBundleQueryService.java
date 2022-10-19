package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBoxBundle;
import com.elysium.metagods.repository.LootBoxBundleRepository;
import com.elysium.metagods.service.criteria.LootBoxBundleCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import com.elysium.metagods.service.mapper.LootBoxBundleMapper;
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
 * Service for executing complex queries for {@link LootBoxBundle} entities in the database.
 * The main input is a {@link LootBoxBundleCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxBundleDTO} or a {@link Page} of {@link LootBoxBundleDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxBundleQueryService extends QueryService<LootBoxBundle> {

    private final LootBoxBundleRepository lootBoxBundleRepository;

    private final LootBoxBundleMapper lootBoxBundleMapper;

    public LootBoxBundleQueryService(LootBoxBundleRepository lootBoxBundleRepository, LootBoxBundleMapper lootBoxBundleMapper) {
        this.lootBoxBundleRepository = lootBoxBundleRepository;
        this.lootBoxBundleMapper = lootBoxBundleMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxBundleDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxBundleDTO> findByCriteria(LootBoxBundleCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxBundle> specification = createSpecification(criteria);
        return lootBoxBundleMapper.toDto(lootBoxBundleRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxBundleDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxBundleDTO> findByCriteria(LootBoxBundleCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBoxBundle> specification = createSpecification(criteria);
        return lootBoxBundleRepository.findAll(specification, page).map(lootBoxBundleMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxBundleCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBoxBundle> specification = createSpecification(criteria);
        return lootBoxBundleRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxBundleCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBoxBundle> createSpecification(LootBoxBundleCriteria criteria) {
        Specification<LootBoxBundle> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBoxBundle_.id));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), LootBoxBundle_.amount));
            }
            if (criteria.getPrice() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPrice(), LootBoxBundle_.price));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), LootBoxBundle_.description));
            }
            if (criteria.getImageUrl() != null) {
                specification = specification.and(buildStringSpecification(criteria.getImageUrl(), LootBoxBundle_.imageUrl));
            }
            if (criteria.getLootBoxId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLootBoxId(),
                            root -> root.join(LootBoxBundle_.lootBox, JoinType.LEFT).get(LootBox_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
