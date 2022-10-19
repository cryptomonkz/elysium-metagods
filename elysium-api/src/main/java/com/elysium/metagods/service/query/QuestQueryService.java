package com.elysium.metagods.service.query;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.Quest;
import com.elysium.metagods.domain.Quest_;
import com.elysium.metagods.repository.QuestRepository;
import com.elysium.metagods.service.criteria.QuestCriteria;
import com.elysium.metagods.service.dto.entity.QuestDTO;
import com.elysium.metagods.service.mapper.QuestMapper;
import lombok.extern.slf4j.Slf4j;
import tech.jhipster.service.QueryService;

@Slf4j
@Service
@Transactional(readOnly = true)
public class QuestQueryService extends QueryService<Quest> {

    private final QuestRepository questRepository;

    private final QuestMapper questMapper;

    public QuestQueryService(QuestRepository questRepository, QuestMapper questMapper) {
        this.questRepository = questRepository;
        this.questMapper = questMapper;
    }

    /**
     * Return a {@link List} of {@link QuestDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<QuestDTO> findByCriteria(QuestCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Quest> specification = createSpecification(criteria);
        return questMapper.toDto(questRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link QuestDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<QuestDTO> findByCriteria(QuestCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Quest> specification = createSpecification(criteria);
        return questRepository.findAll(specification, page).map(questMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(QuestCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Quest> specification = createSpecification(criteria);
        return questRepository.count(specification);
    }

    /**
     * Function to convert {@link QuestCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Quest> createSpecification(QuestCriteria criteria) {
        Specification<Quest> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Quest_.id));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), Quest_.title));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Quest_.description));
            }
            if (criteria.getOnSuccessDialogue() != null) {
                specification = specification.and(buildStringSpecification(criteria.getOnSuccessDialogue(), Quest_.onSuccessDialogue));
            }
            if (criteria.getOnFailDialogue() != null) {
                specification = specification.and(buildStringSpecification(criteria.getOnFailDialogue(), Quest_.onFailDialogue));
            }
            if (criteria.getStakingMode() != null) {
                specification = specification.and(buildSpecification(criteria.getStakingMode(), Quest_.stakingMode));
            }
        }
        return specification;
    }
}
