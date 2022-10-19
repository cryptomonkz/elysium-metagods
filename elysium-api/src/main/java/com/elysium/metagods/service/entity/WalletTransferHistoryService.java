package com.elysium.metagods.service.entity;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.WalletTransferHistory;
import com.elysium.metagods.repository.WalletTransferHistoryRepository;
import com.elysium.metagods.service.dto.entity.WalletTransferHistoryDTO;
import com.elysium.metagods.service.mapper.WalletTransferHistoryMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class WalletTransferHistoryService {

    private final WalletTransferHistoryRepository walletTransferHistoryRepository;

    private final WalletTransferHistoryMapper walletTransferHistoryMapper;

    public WalletTransferHistoryService(
        WalletTransferHistoryRepository walletTransferHistoryRepository,
        WalletTransferHistoryMapper walletTransferHistoryMapper
    ) {
        this.walletTransferHistoryRepository = walletTransferHistoryRepository;
        this.walletTransferHistoryMapper = walletTransferHistoryMapper;
    }

    /**
     * Save a walletTransferHistory.
     *
     * @param walletTransferHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public WalletTransferHistoryDTO save(WalletTransferHistoryDTO walletTransferHistoryDTO) {
        log.debug("Request to save WalletTransferHistory : {}", walletTransferHistoryDTO);
        WalletTransferHistory walletTransferHistory = walletTransferHistoryMapper.toEntity(walletTransferHistoryDTO);
        walletTransferHistory = walletTransferHistoryRepository.save(walletTransferHistory);
        return walletTransferHistoryMapper.toDto(walletTransferHistory);
    }

    public WalletTransferHistory saveEntity(WalletTransferHistory walletTransferHistory) {
        return walletTransferHistoryRepository.save(walletTransferHistory);
    }

    /**
     * Update a walletTransferHistory.
     *
     * @param walletTransferHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public WalletTransferHistoryDTO update(WalletTransferHistoryDTO walletTransferHistoryDTO) {
        log.debug("Request to save WalletTransferHistory : {}", walletTransferHistoryDTO);
        WalletTransferHistory walletTransferHistory = walletTransferHistoryMapper.toEntity(walletTransferHistoryDTO);
        walletTransferHistory = walletTransferHistoryRepository.save(walletTransferHistory);
        return walletTransferHistoryMapper.toDto(walletTransferHistory);
    }

    /**
     * Partially update a walletTransferHistory.
     *
     * @param walletTransferHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<WalletTransferHistoryDTO> partialUpdate(WalletTransferHistoryDTO walletTransferHistoryDTO) {
        log.debug("Request to partially update WalletTransferHistory : {}", walletTransferHistoryDTO);

        return walletTransferHistoryRepository
            .findById(walletTransferHistoryDTO.getId())
            .map(existingWalletTransferHistory -> {
                walletTransferHistoryMapper.partialUpdate(existingWalletTransferHistory, walletTransferHistoryDTO);

                return existingWalletTransferHistory;
            })
            .map(walletTransferHistoryRepository::save)
            .map(walletTransferHistoryMapper::toDto);
    }

    /**
     * Get all the walletTransferHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<WalletTransferHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WalletTransferHistories");
        return walletTransferHistoryRepository.findAll(pageable).map(walletTransferHistoryMapper::toDto);
    }

    /**
     * Get one walletTransferHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<WalletTransferHistoryDTO> findOne(Long id) {
        log.debug("Request to get WalletTransferHistory : {}", id);
        return walletTransferHistoryRepository.findById(id).map(walletTransferHistoryMapper::toDto);
    }

    /**
     * Delete the walletTransferHistory by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete WalletTransferHistory : {}", id);
        walletTransferHistoryRepository.deleteById(id);
    }
}
