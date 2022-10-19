package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*; // for static metamodels
import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.repository.LootBoxRepository;
import com.elysium.metagods.service.criteria.LootBoxCriteria;
import com.elysium.metagods.service.dto.entity.LootBoxDTO;
import com.elysium.metagods.service.mapper.LootBoxMapper;
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
 * Service for executing complex queries for {@link LootBox} entities in the database.
 * The main input is a {@link LootBoxCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LootBoxDTO} or a {@link Page} of {@link LootBoxDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LootBoxQueryService extends QueryService<LootBox> {

    private final LootBoxRepository lootBoxRepository;

    private final LootBoxMapper lootBoxMapper;

    public LootBoxQueryService(LootBoxRepository lootBoxRepository, LootBoxMapper lootBoxMapper) {
        this.lootBoxRepository = lootBoxRepository;
        this.lootBoxMapper = lootBoxMapper;
    }

    /**
     * Return a {@link List} of {@link LootBoxDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LootBoxDTO> findByCriteria(LootBoxCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBox> specification = createSpecification(criteria);
        return lootBoxMapper.toDto(lootBoxRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LootBoxDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxDTO> findByCriteria(LootBoxCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LootBox> specification = createSpecification(criteria);
        return lootBoxRepository.findAll(specification, page).map(lootBoxMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LootBoxCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LootBox> specification = createSpecification(criteria);
        return lootBoxRepository.count(specification);
    }

    /**
     * Function to convert {@link LootBoxCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LootBox> createSpecification(LootBoxCriteria criteria) {
        Specification<LootBox> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LootBox_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), LootBox_.name));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), LootBox_.description));
            }
            if (criteria.getImageUrl() != null) {
                specification = specification.and(buildStringSpecification(criteria.getImageUrl(), LootBox_.imageUrl));
            }
            if (criteria.getBundlesId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getBundlesId(),
                            root -> root.join(LootBox_.bundles, JoinType.LEFT).get(LootBoxBundle_.id)
                        )
                    );
            }
            if (criteria.getItemsId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getItemsId(), root -> root.join(LootBox_.items, JoinType.LEFT).get(LootBoxItem_.id))
                    );
            }
        }
        return specification;
    }
}
