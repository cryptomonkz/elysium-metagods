package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxItem;
import com.elysium.metagods.exception.InsufficientAmountOwnedException;
import com.elysium.metagods.repository.LootBoxItemRepository;
import com.elysium.metagods.service.dto.entity.LootBoxItemDTO;
import com.elysium.metagods.service.mapper.LootBoxItemMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxItem}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxItemService {

    private static final String AMOUNT_AVAILABLE_NONNEGATIVE_CONSTRAINT_NAME = "amount_available_nonnegative";

    private final LootBoxItemRepository lootBoxItemRepository;

    private final LootBoxItemMapper lootBoxItemMapper;

    public LootBoxItemService(LootBoxItemRepository lootBoxItemRepository, LootBoxItemMapper lootBoxItemMapper) {
        this.lootBoxItemRepository = lootBoxItemRepository;
        this.lootBoxItemMapper = lootBoxItemMapper;
    }

    /**
     * Save a lootBoxItem.
     *
     * @param lootBoxItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxItemDTO save(LootBoxItemDTO lootBoxItemDTO) {
        log.debug("Request to save LootBoxItem : {}", lootBoxItemDTO);
        LootBoxItem lootBoxItem = lootBoxItemMapper.toEntity(lootBoxItemDTO);
        lootBoxItem = lootBoxItemRepository.save(lootBoxItem);
        return lootBoxItemMapper.toDto(lootBoxItem);
    }

    /**
     * Update a lootBoxItem.
     *
     * @param lootBoxItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxItemDTO update(LootBoxItemDTO lootBoxItemDTO) {
        log.debug("Request to save LootBoxItem : {}", lootBoxItemDTO);
        LootBoxItem lootBoxItem = lootBoxItemMapper.toEntity(lootBoxItemDTO);
        lootBoxItem = lootBoxItemRepository.save(lootBoxItem);
        return lootBoxItemMapper.toDto(lootBoxItem);
    }

    /**
     * Partially update a lootBoxItem.
     *
     * @param lootBoxItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxItemDTO> partialUpdate(LootBoxItemDTO lootBoxItemDTO) {
        log.debug("Request to partially update LootBoxItem : {}", lootBoxItemDTO);

        return lootBoxItemRepository
            .findById(lootBoxItemDTO.getId())
            .map(existingLootBoxItem -> {
                lootBoxItemMapper.partialUpdate(existingLootBoxItem, lootBoxItemDTO);

                return existingLootBoxItem;
            })
            .map(lootBoxItemRepository::save)
            .map(lootBoxItemMapper::toDto);
    }

    /**
     * Get all the lootBoxItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxItems");
        return lootBoxItemRepository.findAll(pageable).map(lootBoxItemMapper::toDto);
    }

    /**
     * Get one lootBoxItem by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxItemDTO> findOne(Long id) {
        log.debug("Request to get LootBoxItem : {}", id);
        return lootBoxItemRepository.findById(id).map(lootBoxItemMapper::toDto);
    }

    /**
     * Delete the lootBoxItem by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxItem : {}", id);
        lootBoxItemRepository.deleteById(id);
    }

    public void addToAmountAvailable(Long lootBoxItemId, Long amount) {
        lootBoxItemRepository.addToAmountAvailable(lootBoxItemId, amount);
    }

    public void subtractFromAmountAvailable(Long lootBoxItemId, Long amount) {
        try {
            lootBoxItemRepository.subtractFromAmountAvailable(lootBoxItemId, amount);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage() != null && ex.getMessage().contains(AMOUNT_AVAILABLE_NONNEGATIVE_CONSTRAINT_NAME)) {
                throw new InsufficientAmountOwnedException();
            }
            throw ex;
        }
    }
}
