package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxRewardHistory;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.LootBoxRewardHistoryRepository;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryDTO;
import com.elysium.metagods.service.mapper.LootBoxRewardHistoryMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.Optional;

/**
 * Service Implementation for managing {@link LootBoxRewardHistory}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxRewardHistoryService {

    private final LootBoxRewardHistoryRepository lootBoxRewardHistoryRepository;

    private final LootBoxRewardHistoryMapper lootBoxRewardHistoryMapper;

    public LootBoxRewardHistoryService(
        LootBoxRewardHistoryRepository lootBoxRewardHistoryRepository,
        LootBoxRewardHistoryMapper lootBoxRewardHistoryMapper
    ) {
        this.lootBoxRewardHistoryRepository = lootBoxRewardHistoryRepository;
        this.lootBoxRewardHistoryMapper = lootBoxRewardHistoryMapper;
    }

    /**
     * Save a lootBoxRewardHistory.
     *
     * @param lootBoxRewardHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxRewardHistoryDTO save(LootBoxRewardHistoryDTO lootBoxRewardHistoryDTO) {
        log.debug("Request to save LootBoxRewardHistory : {}", lootBoxRewardHistoryDTO);
        LootBoxRewardHistory lootBoxRewardHistory = lootBoxRewardHistoryMapper.toEntity(lootBoxRewardHistoryDTO);
        lootBoxRewardHistory = lootBoxRewardHistoryRepository.save(lootBoxRewardHistory);
        return lootBoxRewardHistoryMapper.toDto(lootBoxRewardHistory);
    }

    /**
     * Update a lootBoxRewardHistory.
     *
     * @param lootBoxRewardHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxRewardHistoryDTO update(LootBoxRewardHistoryDTO lootBoxRewardHistoryDTO) {
        log.debug("Request to save LootBoxRewardHistory : {}", lootBoxRewardHistoryDTO);
        LootBoxRewardHistory lootBoxRewardHistory = lootBoxRewardHistoryMapper.toEntity(lootBoxRewardHistoryDTO);
        lootBoxRewardHistory = lootBoxRewardHistoryRepository.save(lootBoxRewardHistory);
        return lootBoxRewardHistoryMapper.toDto(lootBoxRewardHistory);
    }

    /**
     * Partially update a lootBoxRewardHistory.
     *
     * @param lootBoxRewardHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxRewardHistoryDTO> partialUpdate(LootBoxRewardHistoryDTO lootBoxRewardHistoryDTO) {
        log.debug("Request to partially update LootBoxRewardHistory : {}", lootBoxRewardHistoryDTO);

        return lootBoxRewardHistoryRepository
            .findById(lootBoxRewardHistoryDTO.getId())
            .map(existingLootBoxRewardHistory -> {
                lootBoxRewardHistoryMapper.partialUpdate(existingLootBoxRewardHistory, lootBoxRewardHistoryDTO);

                return existingLootBoxRewardHistory;
            })
            .map(lootBoxRewardHistoryRepository::save)
            .map(lootBoxRewardHistoryMapper::toDto);
    }

    /**
     * Get all the lootBoxRewardHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxRewardHistory> findAllByOwner(@NotNull Wallet wallet, Pageable pageable) {
        log.debug("Request to get all LootBoxRewardHistories");
        return lootBoxRewardHistoryRepository.findAllByOwner(wallet, pageable);
    }

    /**
     * Get one lootBoxRewardHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxRewardHistoryDTO> findOne(Long id) {
        log.debug("Request to get LootBoxRewardHistory : {}", id);
        return lootBoxRewardHistoryRepository.findById(id).map(lootBoxRewardHistoryMapper::toDto);
    }

    /**
     * Delete the lootBoxRewardHistory by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxRewardHistory : {}", id);
        lootBoxRewardHistoryRepository.deleteById(id);
    }

    public LootBoxRewardHistory saveEntity(LootBoxRewardHistory lootBoxRewardHistory) {
        return lootBoxRewardHistoryRepository.save(lootBoxRewardHistory);
    }

    public Optional<LootBoxRewardHistory> findById(Long rewardId) {
        return lootBoxRewardHistoryRepository.findById(rewardId);
    }

    public LootBoxRewardHistory findByIdOrThrow(Long rewardId) {
        return findById(rewardId).orElseThrow(() -> new NotFoundException("No reward found with id " + rewardId));
    }
}
