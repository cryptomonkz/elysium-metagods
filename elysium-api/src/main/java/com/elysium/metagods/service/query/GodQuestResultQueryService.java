package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.GodQuestResult;
import com.elysium.metagods.domain.GodQuestResult_;
import com.elysium.metagods.repository.GodQuestResultRepository;
import com.elysium.metagods.service.criteria.GodQuestResultCriteria;
import com.elysium.metagods.service.dto.entity.GodQuestResultDTO;
import com.elysium.metagods.service.mapper.GodQuestResultMapper;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link GodQuestResult} entities in the database.
 * The main input is a {@link GodQuestResultCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link GodQuestResultDTO} or a {@link Page} of {@link GodQuestResultDTO} which fulfills the criteria.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class GodQuestResultQueryService extends QueryService<GodQuestResult> {

    private final GodQuestResultRepository godQuestResultRepository;

    private final GodQuestResultMapper godQuestResultMapper;

    public GodQuestResultQueryService(GodQuestResultRepository godQuestResultRepository, GodQuestResultMapper godQuestResultMapper) {
        this.godQuestResultRepository = godQuestResultRepository;
        this.godQuestResultMapper = godQuestResultMapper;
    }

    /**
     * Return a {@link List} of {@link GodQuestResultDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<GodQuestResultDTO> findByCriteria(GodQuestResultCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<GodQuestResult> specification = createSpecification(criteria);
        return godQuestResultMapper.toDto(godQuestResultRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link GodQuestResultDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<GodQuestResultDTO> findByCriteria(GodQuestResultCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<GodQuestResult> specification = createSpecification(criteria);
        return godQuestResultRepository.findAll(specification, page).map(godQuestResultMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(GodQuestResultCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<GodQuestResult> specification = createSpecification(criteria);
        return godQuestResultRepository.count(specification);
    }

    /**
     * Function to convert {@link GodQuestResultCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<GodQuestResult> createSpecification(GodQuestResultCriteria criteria) {
        Specification<GodQuestResult> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), GodQuestResult_.id));
            }
            if (criteria.getIsSuccessful() != null) {
                specification = specification.and(buildSpecification(criteria.getIsSuccessful(), GodQuestResult_.isSuccessful));
            }
            if (criteria.getPointsGained() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPointsGained(), GodQuestResult_.pointsGained));
            }
        }
        return specification;
    }
}
