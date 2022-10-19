package com.elysium.metagods.service.query;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.WalletTransferHistory;
import com.elysium.metagods.domain.WalletTransferHistory_;
import com.elysium.metagods.repository.WalletTransferHistoryRepository;
import com.elysium.metagods.service.criteria.WalletTransferHistoryCriteria;
import com.elysium.metagods.service.dto.entity.WalletTransferHistoryDTO;
import com.elysium.metagods.service.mapper.WalletTransferHistoryMapper;
import lombok.extern.slf4j.Slf4j;
import tech.jhipster.service.QueryService;

@Slf4j
@Service
@Transactional(readOnly = true)
public class WalletTransferHistoryQueryService extends QueryService<WalletTransferHistory> {

    private final WalletTransferHistoryRepository walletTransferHistoryRepository;

    private final WalletTransferHistoryMapper walletTransferHistoryMapper;

    public WalletTransferHistoryQueryService(
        WalletTransferHistoryRepository walletTransferHistoryRepository,
        WalletTransferHistoryMapper walletTransferHistoryMapper
    ) {
        this.walletTransferHistoryRepository = walletTransferHistoryRepository;
        this.walletTransferHistoryMapper = walletTransferHistoryMapper;
    }

    /**
     * Return a {@link List} of {@link WalletTransferHistoryDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<WalletTransferHistoryDTO> findByCriteria(WalletTransferHistoryCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<WalletTransferHistory> specification = createSpecification(criteria);
        return walletTransferHistoryMapper.toDto(walletTransferHistoryRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link WalletTransferHistoryDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page     The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<WalletTransferHistoryDTO> findByCriteria(WalletTransferHistoryCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<WalletTransferHistory> specification = createSpecification(criteria);
        return walletTransferHistoryRepository.findAll(specification, page).map(walletTransferHistoryMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(WalletTransferHistoryCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<WalletTransferHistory> specification = createSpecification(criteria);
        return walletTransferHistoryRepository.count(specification);
    }

    /**
     * Function to convert {@link WalletTransferHistoryCriteria} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<WalletTransferHistory> createSpecification(WalletTransferHistoryCriteria criteria) {
        Specification<WalletTransferHistory> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), WalletTransferHistory_.id));
            }
            if (criteria.getFromAddress() != null) {
                specification = specification.and(buildStringSpecification(
                    criteria.getFromAddress(),
                    WalletTransferHistory_.fromAddress
                ));
            }
            if (criteria.getToAddress() != null) {
                specification = specification.and(buildStringSpecification(
                    criteria.getToAddress(),
                    WalletTransferHistory_.toAddress
                ));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(
                    criteria.getAmount(),
                    WalletTransferHistory_.amount
                ));
            }
        }
        return specification;
    }
}
