package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxErc1155Item;
import com.elysium.metagods.repository.LootBoxErc1155ItemRepository;
import com.elysium.metagods.service.dto.entity.LootBoxErc1155ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc1155ItemMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxErc1155Item}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxErc1155ItemService {

    private final LootBoxErc1155ItemRepository lootBoxErc1155ItemRepository;

    private final LootBoxErc1155ItemMapper lootBoxErc1155ItemMapper;

    public LootBoxErc1155ItemService(
        LootBoxErc1155ItemRepository lootBoxErc1155ItemRepository,
        LootBoxErc1155ItemMapper lootBoxErc1155ItemMapper
    ) {
        this.lootBoxErc1155ItemRepository = lootBoxErc1155ItemRepository;
        this.lootBoxErc1155ItemMapper = lootBoxErc1155ItemMapper;
    }

    /**
     * Save a lootBoxErc1155Item.
     *
     * @param lootBoxErc1155ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc1155ItemDTO save(LootBoxErc1155ItemDTO lootBoxErc1155ItemDTO) {
        log.debug("Request to save LootBoxErc1155Item : {}", lootBoxErc1155ItemDTO);
        LootBoxErc1155Item lootBoxErc1155Item = lootBoxErc1155ItemMapper.toEntity(lootBoxErc1155ItemDTO);
        lootBoxErc1155Item = lootBoxErc1155ItemRepository.save(lootBoxErc1155Item);
        return lootBoxErc1155ItemMapper.toDto(lootBoxErc1155Item);
    }

    /**
     * Update a lootBoxErc1155Item.
     *
     * @param lootBoxErc1155ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc1155ItemDTO update(LootBoxErc1155ItemDTO lootBoxErc1155ItemDTO) {
        log.debug("Request to save LootBoxErc1155Item : {}", lootBoxErc1155ItemDTO);
        LootBoxErc1155Item lootBoxErc1155Item = lootBoxErc1155ItemMapper.toEntity(lootBoxErc1155ItemDTO);
        lootBoxErc1155Item = lootBoxErc1155ItemRepository.save(lootBoxErc1155Item);
        return lootBoxErc1155ItemMapper.toDto(lootBoxErc1155Item);
    }

    /**
     * Partially update a lootBoxErc1155Item.
     *
     * @param lootBoxErc1155ItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxErc1155ItemDTO> partialUpdate(LootBoxErc1155ItemDTO lootBoxErc1155ItemDTO) {
        log.debug("Request to partially update LootBoxErc1155Item : {}", lootBoxErc1155ItemDTO);

        return lootBoxErc1155ItemRepository
            .findById(lootBoxErc1155ItemDTO.getId())
            .map(existingLootBoxErc1155Item -> {
                lootBoxErc1155ItemMapper.partialUpdate(existingLootBoxErc1155Item, lootBoxErc1155ItemDTO);

                return existingLootBoxErc1155Item;
            })
            .map(lootBoxErc1155ItemRepository::save)
            .map(lootBoxErc1155ItemMapper::toDto);
    }

    /**
     * Get all the lootBoxErc1155Items.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc1155ItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxErc1155Items");
        return lootBoxErc1155ItemRepository.findAll(pageable).map(lootBoxErc1155ItemMapper::toDto);
    }

    /**
     * Get one lootBoxErc1155Item by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxErc1155ItemDTO> findOne(Long id) {
        log.debug("Request to get LootBoxErc1155Item : {}", id);
        return lootBoxErc1155ItemRepository.findById(id).map(lootBoxErc1155ItemMapper::toDto);
    }

    /**
     * Delete the lootBoxErc1155Item by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxErc1155Item : {}", id);
        lootBoxErc1155ItemRepository.deleteById(id);
    }
}
