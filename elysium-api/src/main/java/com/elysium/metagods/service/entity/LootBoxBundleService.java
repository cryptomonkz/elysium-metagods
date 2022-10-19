package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxBundle;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.exception.OutOfStockException;
import com.elysium.metagods.repository.LootBoxBundleRepository;
import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import com.elysium.metagods.service.mapper.LootBoxBundleMapper;

import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxBundle}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxBundleService {

    private static final CharSequence STOCK_NONNEGATIVE_CONSTRAINT_NAME = "stock_nonnegative";

    private final LootBoxBundleRepository lootBoxBundleRepository;

    private final LootBoxBundleMapper lootBoxBundleMapper;

    public LootBoxBundleService(LootBoxBundleRepository lootBoxBundleRepository, LootBoxBundleMapper lootBoxBundleMapper) {
        this.lootBoxBundleRepository = lootBoxBundleRepository;
        this.lootBoxBundleMapper = lootBoxBundleMapper;
    }

    /**
     * Save a lootBoxBundle.
     *
     * @param lootBoxBundleDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxBundleDTO save(LootBoxBundleDTO lootBoxBundleDTO) {
        log.debug("Request to save LootBoxBundle : {}", lootBoxBundleDTO);
        LootBoxBundle lootBoxBundle = lootBoxBundleMapper.toEntity(lootBoxBundleDTO);
        lootBoxBundle = lootBoxBundleRepository.save(lootBoxBundle);
        return lootBoxBundleMapper.toDto(lootBoxBundle);
    }

    /**
     * Update a lootBoxBundle.
     *
     * @param lootBoxBundleDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxBundleDTO update(LootBoxBundleDTO lootBoxBundleDTO) {
        log.debug("Request to save LootBoxBundle : {}", lootBoxBundleDTO);
        LootBoxBundle lootBoxBundle = lootBoxBundleMapper.toEntity(lootBoxBundleDTO);
        lootBoxBundle = lootBoxBundleRepository.save(lootBoxBundle);
        return lootBoxBundleMapper.toDto(lootBoxBundle);
    }

    /**
     * Partially update a lootBoxBundle.
     *
     * @param lootBoxBundleDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxBundleDTO> partialUpdate(LootBoxBundleDTO lootBoxBundleDTO) {
        log.debug("Request to partially update LootBoxBundle : {}", lootBoxBundleDTO);

        return lootBoxBundleRepository
            .findById(lootBoxBundleDTO.getId())
            .map(existingLootBoxBundle -> {
                lootBoxBundleMapper.partialUpdate(existingLootBoxBundle, lootBoxBundleDTO);

                return existingLootBoxBundle;
            })
            .map(lootBoxBundleRepository::save)
            .map(lootBoxBundleMapper::toDto);
    }

    /**
     * Get all the lootBoxBundles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxBundle> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxBundles paged");
        return lootBoxBundleRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<LootBoxBundle> findAll() {
        log.debug("Request to get all LootBoxBundles");
        return lootBoxBundleRepository.findAll();
    }

    /**
     * Get one lootBoxBundle by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxBundleDTO> findOne(Long id) {
        log.debug("Request to get LootBoxBundle : {}", id);
        return lootBoxBundleRepository.findById(id).map(lootBoxBundleMapper::toDto);
    }

    /**
     * Delete the lootBoxBundle by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxBundle : {}", id);
        lootBoxBundleRepository.deleteById(id);
    }

    public Optional<LootBoxBundle> findById(Long bundleId) {
        return lootBoxBundleRepository.findById(bundleId);
    }

    public LootBoxBundle findByIdOrThrow(Long bundleId) {
        return findById(bundleId).orElseThrow(() -> new NotFoundException("No bundle found with id " + bundleId));
    }

    public void subtractStockFromLootBoxBundle(Long lootBoxOwnedId, Long amount) {
        try {
            lootBoxBundleRepository.subtractStockFromLootBoxBundle(lootBoxOwnedId, amount);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage() != null && ex.getMessage().contains(STOCK_NONNEGATIVE_CONSTRAINT_NAME)) {
                throw new OutOfStockException();
            }
            throw ex;
        }
    }
}
