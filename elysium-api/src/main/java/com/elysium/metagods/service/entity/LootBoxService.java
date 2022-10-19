package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.LootBoxRepository;
import com.elysium.metagods.service.dto.entity.LootBoxDTO;
import com.elysium.metagods.service.mapper.LootBoxMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBox}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxService {

    private final LootBoxRepository lootBoxRepository;

    private final LootBoxMapper lootBoxMapper;

    public LootBoxService(LootBoxRepository lootBoxRepository, LootBoxMapper lootBoxMapper) {
        this.lootBoxRepository = lootBoxRepository;
        this.lootBoxMapper = lootBoxMapper;
    }

    /**
     * Save a lootBox.
     *
     * @param lootBoxDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxDTO save(LootBoxDTO lootBoxDTO) {
        log.debug("Request to save LootBox : {}", lootBoxDTO);
        LootBox lootBox = lootBoxMapper.toEntity(lootBoxDTO);
        lootBox = lootBoxRepository.save(lootBox);
        return lootBoxMapper.toDto(lootBox);
    }

    /**
     * Update a lootBox.
     *
     * @param lootBoxDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxDTO update(LootBoxDTO lootBoxDTO) {
        log.debug("Request to save LootBox : {}", lootBoxDTO);
        LootBox lootBox = lootBoxMapper.toEntity(lootBoxDTO);
        lootBox = lootBoxRepository.save(lootBox);
        return lootBoxMapper.toDto(lootBox);
    }

    /**
     * Partially update a lootBox.
     *
     * @param lootBoxDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxDTO> partialUpdate(LootBoxDTO lootBoxDTO) {
        log.debug("Request to partially update LootBox : {}", lootBoxDTO);

        return lootBoxRepository
            .findById(lootBoxDTO.getId())
            .map(existingLootBox -> {
                lootBoxMapper.partialUpdate(existingLootBox, lootBoxDTO);

                return existingLootBox;
            })
            .map(lootBoxRepository::save)
            .map(lootBoxMapper::toDto);
    }

    /**
     * Get all the lootBoxes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxes");
        return lootBoxRepository.findAll(pageable).map(lootBoxMapper::toDto);
    }

    /**
     * Get one lootBox by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxDTO> findOne(Long id) {
        log.debug("Request to get LootBox : {}", id);
        return lootBoxRepository.findById(id).map(lootBoxMapper::toDto);
    }

    /**
     * Delete the lootBox by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBox : {}", id);
        lootBoxRepository.deleteById(id);
    }

    public Optional<LootBox> findById(Long lootBoxId) {
        return lootBoxRepository.findById(lootBoxId);
    }

    public LootBox findByIdOrThrow(Long lootBoxId) {
        return findById(lootBoxId).orElseThrow(() -> new NotFoundException("No LootBox found with id " + lootBoxId));
    }
}
