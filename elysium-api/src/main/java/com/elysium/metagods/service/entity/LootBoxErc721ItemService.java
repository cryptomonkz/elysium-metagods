package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBoxErc721Item;
import com.elysium.metagods.repository.LootBoxErc721ItemRepository;
import com.elysium.metagods.service.dto.entity.LootBoxErc721ItemDTO;
import com.elysium.metagods.service.mapper.LootBoxErc721ItemMapper;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LootBoxErc721Item}.
 */
@Slf4j
@Service
@Transactional
public class LootBoxErc721ItemService {

    private final LootBoxErc721ItemRepository lootBoxErc721ItemRepository;

    private final LootBoxErc721ItemMapper lootBoxErc721ItemMapper;

    public LootBoxErc721ItemService(
        LootBoxErc721ItemRepository lootBoxErc721ItemRepository,
        LootBoxErc721ItemMapper lootBoxErc721ItemMapper
    ) {
        this.lootBoxErc721ItemRepository = lootBoxErc721ItemRepository;
        this.lootBoxErc721ItemMapper = lootBoxErc721ItemMapper;
    }

    /**
     * Save a lootBoxErc721Item.
     *
     * @param lootBoxErc721ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc721ItemDTO save(LootBoxErc721ItemDTO lootBoxErc721ItemDTO) {
        log.debug("Request to save LootBoxErc721Item : {}", lootBoxErc721ItemDTO);
        LootBoxErc721Item lootBoxErc721Item = lootBoxErc721ItemMapper.toEntity(lootBoxErc721ItemDTO);
        lootBoxErc721Item = lootBoxErc721ItemRepository.save(lootBoxErc721Item);
        return lootBoxErc721ItemMapper.toDto(lootBoxErc721Item);
    }

    /**
     * Update a lootBoxErc721Item.
     *
     * @param lootBoxErc721ItemDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxErc721ItemDTO update(LootBoxErc721ItemDTO lootBoxErc721ItemDTO) {
        log.debug("Request to save LootBoxErc721Item : {}", lootBoxErc721ItemDTO);
        LootBoxErc721Item lootBoxErc721Item = lootBoxErc721ItemMapper.toEntity(lootBoxErc721ItemDTO);
        lootBoxErc721Item = lootBoxErc721ItemRepository.save(lootBoxErc721Item);
        return lootBoxErc721ItemMapper.toDto(lootBoxErc721Item);
    }

    /**
     * Partially update a lootBoxErc721Item.
     *
     * @param lootBoxErc721ItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxErc721ItemDTO> partialUpdate(LootBoxErc721ItemDTO lootBoxErc721ItemDTO) {
        log.debug("Request to partially update LootBoxErc721Item : {}", lootBoxErc721ItemDTO);

        return lootBoxErc721ItemRepository
            .findById(lootBoxErc721ItemDTO.getId())
            .map(existingLootBoxErc721Item -> {
                lootBoxErc721ItemMapper.partialUpdate(existingLootBoxErc721Item, lootBoxErc721ItemDTO);

                return existingLootBoxErc721Item;
            })
            .map(lootBoxErc721ItemRepository::save)
            .map(lootBoxErc721ItemMapper::toDto);
    }

    /**
     * Get all the lootBoxErc721Items.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxErc721ItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxErc721Items");
        return lootBoxErc721ItemRepository.findAll(pageable).map(lootBoxErc721ItemMapper::toDto);
    }

    /**
     * Get one lootBoxErc721Item by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxErc721ItemDTO> findOne(Long id) {
        log.debug("Request to get LootBoxErc721Item : {}", id);
        return lootBoxErc721ItemRepository.findById(id).map(lootBoxErc721ItemMapper::toDto);
    }

    /**
     * Delete the lootBoxErc721Item by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxErc721Item : {}", id);
        lootBoxErc721ItemRepository.deleteById(id);
    }
}
