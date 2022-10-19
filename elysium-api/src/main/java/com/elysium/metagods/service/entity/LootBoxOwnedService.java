package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.LootBox;
import com.elysium.metagods.domain.LootBoxOwned;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.exception.InsufficientAmountOwnedException;
import com.elysium.metagods.repository.LootBoxOwnedRepository;
import com.elysium.metagods.service.dto.entity.LootBoxOwnedDTO;
import com.elysium.metagods.service.mapper.LootBoxOwnedMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link LootBoxOwned}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class LootBoxOwnedService {

    private static final String AMOUNT_NONNEGATIVE_CONSTRAINT_NAME = "amount_nonnegative";

    private final LootBoxOwnedRepository lootBoxOwnedRepository;
    private final LootBoxOwnedMapper lootBoxOwnedMapper;

    /**
     * Save a lootBoxOwned.
     *
     * @param lootBoxOwnedDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxOwnedDTO save(LootBoxOwnedDTO lootBoxOwnedDTO) {
        log.debug("Request to save LootBoxOwned : {}", lootBoxOwnedDTO);
        LootBoxOwned lootBoxOwned = lootBoxOwnedMapper.toEntity(lootBoxOwnedDTO);
        lootBoxOwned = lootBoxOwnedRepository.save(lootBoxOwned);
        return lootBoxOwnedMapper.toDto(lootBoxOwned);
    }

    /**
     * Update a lootBoxOwned.
     *
     * @param lootBoxOwnedDTO the entity to save.
     * @return the persisted entity.
     */
    public LootBoxOwnedDTO update(LootBoxOwnedDTO lootBoxOwnedDTO) {
        log.debug("Request to save LootBoxOwned : {}", lootBoxOwnedDTO);
        LootBoxOwned lootBoxOwned = lootBoxOwnedMapper.toEntity(lootBoxOwnedDTO);
        lootBoxOwned = lootBoxOwnedRepository.save(lootBoxOwned);
        return lootBoxOwnedMapper.toDto(lootBoxOwned);
    }

    /**
     * Partially update a lootBoxOwned.
     *
     * @param lootBoxOwnedDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LootBoxOwnedDTO> partialUpdate(LootBoxOwnedDTO lootBoxOwnedDTO) {
        log.debug("Request to partially update LootBoxOwned : {}", lootBoxOwnedDTO);

        return lootBoxOwnedRepository
            .findById(lootBoxOwnedDTO.getId())
            .map(existingLootBoxOwned -> {
                lootBoxOwnedMapper.partialUpdate(existingLootBoxOwned, lootBoxOwnedDTO);

                return existingLootBoxOwned;
            })
            .map(lootBoxOwnedRepository::save)
            .map(lootBoxOwnedMapper::toDto);
    }

    /**
     * Get all the lootBoxOwneds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LootBoxOwnedDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LootBoxOwneds");
        return lootBoxOwnedRepository.findAll(pageable).map(lootBoxOwnedMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<LootBoxOwnedDTO> findAllByOwner(@NotNull Wallet owner) {
        return lootBoxOwnedMapper.toDto(lootBoxOwnedRepository.findAllByOwnerAndAmountGreaterThan(owner, 0L));
    }

    /**
     * Get one lootBoxOwned by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LootBoxOwnedDTO> findOne(Long id) {
        log.debug("Request to get LootBoxOwned : {}", id);
        return lootBoxOwnedRepository.findById(id).map(lootBoxOwnedMapper::toDto);
    }

    /**
     * Delete the lootBoxOwned by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LootBoxOwned : {}", id);
        lootBoxOwnedRepository.deleteById(id);
    }

    public LootBoxOwned findOrCreate(Wallet wallet, LootBox lootBox) {
        return lootBoxOwnedRepository
            .findByOwnerAndLootBox(wallet, lootBox)
            .orElseGet(() -> lootBoxOwnedRepository.save(
                new LootBoxOwned().setOwner(wallet)
                                  .setLootBox(lootBox)
                                  .setAmount(0L)
            ));
    }

    public void addAmountOwnedToLootBoxOwned(Long lootBoxOwnedId, Long amount) {
        lootBoxOwnedRepository.addAmountToLootBoxOwned(lootBoxOwnedId, amount);
    }

    public void subtractAmountOwnedFromLootBoxOwned(Long lootBoxOwnedId, Long amount) {
        try {
            lootBoxOwnedRepository.subtractAmountFromLootBoxOwned(lootBoxOwnedId, amount);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage() != null && ex.getMessage().contains(AMOUNT_NONNEGATIVE_CONSTRAINT_NAME)) {
                throw new InsufficientAmountOwnedException();
            }
            throw ex;
        }
    }
}
