package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxPurchaseHistory;
import com.elysium.metagods.repository.LootBoxPurchaseHistoryRepository;
import com.elysium.metagods.service.dto.entity.LootBoxPurchaseHistoryDTO;
import com.elysium.metagods.service.mapper.LootBoxPurchaseHistoryMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxPurchaseHistory}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxPurchaseHistoryService {

    private final LootBoxPurchaseHistoryRepository lootBoxPurchaseHistoryRepository;

    private final LootBoxPurchaseHistoryMapper lootBoxPurchaseHistoryMapper;

    public LootBoxPurchaseHistoryService(
        LootBoxPurchaseHistoryRepository lootBoxPurchaseHistoryRepository,
        LootBoxPurchaseHistoryMapper lootBoxPurchaseHistoryMapper
    ) {
        this.lootBoxPurchaseHistoryRepository = lootBoxPurchaseHistoryRepository;
        this.lootBoxPurchaseHistoryMapper = lootBoxPurchaseHistoryMapper;
    }

    /**
     * Save a lootBoxPurchaseHistory.
     *
     * @param lootBoxPurchaseHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxPurchaseHistoryDTO save(LootBoxPurchaseHistoryDTO lootBoxPurchaseHistoryDTO) {
        log.debug("Request to save LootBoxPurchaseHistory : {}", lootBoxPurchaseHistoryDTO);
        LootBoxPurchaseHistory lootBoxPurchaseHistory = lootBoxPurchaseHistoryMapper.toEntity(lootBoxPurchaseHistoryDTO);
        lootBoxPurchaseHistory = lootBoxPurchaseHistoryRepository.save(lootBoxPurchaseHistory);
        return lootBoxPurchaseHistoryMapper.toDto(lootBoxPurchaseHistory);
    }

    /**
     * Update a lootBoxPurchaseHistory.
     *
     * @param lootBoxPurchaseHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxPurchaseHistoryDTO update(LootBoxPurchaseHistoryDTO lootBoxPurchaseHistoryDTO) {
        log.debug("Request to save LootBoxPurchaseHistory : {}", lootBoxPurchaseHistoryDTO);
        LootBoxPurchaseHistory lootBoxPurchaseHistory = lootBoxPurchaseHistoryMapper.toEntity(lootBoxPurchaseHistoryDTO);
        lootBoxPurchaseHistory = lootBoxPurchaseHistoryRepository.save(lootBoxPurchaseHistory);
        return lootBoxPurchaseHistoryMapper.toDto(lootBoxPurchaseHistory);
    }

    /**
     * Partially update a lootBoxPurchaseHistory.
     *
     * @param lootBoxPurchaseHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxPurchaseHistoryDTO> partialUpdate(LootBoxPurchaseHistoryDTO lootBoxPurchaseHistoryDTO) {
        log.debug("Request to partially update LootBoxPurchaseHistory : {}", lootBoxPurchaseHistoryDTO);

        return lootBoxPurchaseHistoryRepository
            .findById(lootBoxPurchaseHistoryDTO.getId())
            .map(existingLootBoxPurchaseHistory -> {
                lootBoxPurchaseHistoryMapper.partialUpdate(existingLootBoxPurchaseHistory, lootBoxPurchaseHistoryDTO);

                return existingLootBoxPurchaseHistory;
            })
            .map(lootBoxPurchaseHistoryRepository::save)
            .map(lootBoxPurchaseHistoryMapper::toDto);
    }

    /**
     * Get all the lootBoxPurchaseHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxPurchaseHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxPurchaseHistories");
        return lootBoxPurchaseHistoryRepository.findAll(pageable).map(lootBoxPurchaseHistoryMapper::toDto);
    }

    /**
     * Get one lootBoxPurchaseHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxPurchaseHistoryDTO> findOne(Long id) {
        log.debug("Request to get LootBoxPurchaseHistory : {}", id);
        return lootBoxPurchaseHistoryRepository.findById(id).map(lootBoxPurchaseHistoryMapper::toDto);
    }

    /**
     * Delete the lootBoxPurchaseHistory by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxPurchaseHistory : {}", id);
        lootBoxPurchaseHistoryRepository.deleteById(id);
    }

    public LootBoxPurchaseHistory saveEntity(LootBoxPurchaseHistory lootBoxPurchaseHistory) {
        return lootBoxPurchaseHistoryRepository.save(lootBoxPurchaseHistory);
    }
}
