package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.LootBoxOwned;
import com.elysium.metagods.repository.LootBoxOwnedRepository;
import com.elysium.metagods.service.criteria.LootBoxOwnedCriteria;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class LootBoxOwnedQueryService extends SpecificationService<LootBoxOwned> {

    private final LootBoxOwnedRepository lootBoxOwnedRepository;

    @Transactional(readOnly = true)
    public List<LootBoxOwned> findByCriteria(LootBoxOwnedCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LootBoxOwned> specification = createSpecification(criteria);
        return lootBoxOwnedRepository.findAll(specification);
    }

    protected Specification<LootBoxOwned> createSpecification(LootBoxOwnedCriteria criteria) {
        return buildLootBoxOwnedSpecification(root -> root, criteria);
    }

}
