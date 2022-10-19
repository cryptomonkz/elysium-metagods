package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxErc20Item;
import com.elysium.metagods.repository.LootBoxErc20ItemRepository;
import com.elysium.metagods.service.dto.entity.LootBoxErc20ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc20ItemMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxErc20Item}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxErc20ItemService {

    private final LootBoxErc20ItemRepository lootBoxErc20ItemRepository;

    private final LootBoxErc20ItemMapper lootBoxErc20ItemMapper;

    public LootBoxErc20ItemService(LootBoxErc20ItemRepository lootBoxErc20ItemRepository, LootBoxErc20ItemMapper lootBoxErc20ItemMapper) {
        this.lootBoxErc20ItemRepository = lootBoxErc20ItemRepository;
        this.lootBoxErc20ItemMapper = lootBoxErc20ItemMapper;
    }

    /**
     * Save a lootBoxErc20Item.
     *
     * @param lootBoxErc20ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc20ItemDTO save(LootBoxErc20ItemDTO lootBoxErc20ItemDTO) {
        log.debug("Request to save LootBoxErc20Item : {}", lootBoxErc20ItemDTO);
        LootBoxErc20Item lootBoxErc20Item = lootBoxErc20ItemMapper.toEntity(lootBoxErc20ItemDTO);
        lootBoxErc20Item = lootBoxErc20ItemRepository.save(lootBoxErc20Item);
        return lootBoxErc20ItemMapper.toDto(lootBoxErc20Item);
    }

    /**
     * Update a lootBoxErc20Item.
     *
     * @param lootBoxErc20ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc20ItemDTO update(LootBoxErc20ItemDTO lootBoxErc20ItemDTO) {
        log.debug("Request to save LootBoxErc20Item : {}", lootBoxErc20ItemDTO);
        LootBoxErc20Item lootBoxErc20Item = lootBoxErc20ItemMapper.toEntity(lootBoxErc20ItemDTO);
        lootBoxErc20Item = lootBoxErc20ItemRepository.save(lootBoxErc20Item);
        return lootBoxErc20ItemMapper.toDto(lootBoxErc20Item);
    }

    /**
     * Partially update a lootBoxErc20Item.
     *
     * @param lootBoxErc20ItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxErc20ItemDTO> partialUpdate(LootBoxErc20ItemDTO lootBoxErc20ItemDTO) {
        log.debug("Request to partially update LootBoxErc20Item : {}", lootBoxErc20ItemDTO);

        return lootBoxErc20ItemRepository
            .findById(lootBoxErc20ItemDTO.getId())
            .map(existingLootBoxErc20Item -> {
                lootBoxErc20ItemMapper.partialUpdate(existingLootBoxErc20Item, lootBoxErc20ItemDTO);

                return existingLootBoxErc20Item;
            })
            .map(lootBoxErc20ItemRepository::save)
            .map(lootBoxErc20ItemMapper::toDto);
    }

    /**
     * Get all the lootBoxErc20Items.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc20ItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxErc20Items");
        return lootBoxErc20ItemRepository.findAll(pageable).map(lootBoxErc20ItemMapper::toDto);
    }

    /**
     * Get one lootBoxErc20Item by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxErc20ItemDTO> findOne(Long id) {
        log.debug("Request to get LootBoxErc20Item : {}", id);
        return lootBoxErc20ItemRepository.findById(id).map(lootBoxErc20ItemMapper::toDto);
    }

    /**
     * Delete the lootBoxErc20Item by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxErc20Item : {}", id);
        lootBoxErc20ItemRepository.deleteById(id);
    }
}
