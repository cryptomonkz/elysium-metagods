package com.elysium.metagods.service.entity;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.enumeration.ProcessingType;
import com.elysium.metagods.exception.InsufficientFundsException;
import com.elysium.metagods.repository.WalletRepository;
import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.dto.request.DepositRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Implementation for managing {@link Wallet}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class WalletService {

    private static final String BALANCE_NONNEGATIVE_CONSTRAINT_NAME = "balance_nonnegative";

    private final WalletRepository walletRepository;
    private final Web3ServiceConnector web3ServiceConnector;
    private final ProcessedTransactionService transactionService;

    @Transactional(readOnly = true)
    public Optional<Wallet> findOne(@NotNull String address) {
        log.debug("Request to get Wallet : {}", address);
        return walletRepository.findByAddressIgnoreCase(address);
    }

    @Transactional(readOnly = true)
    public Wallet findOneStrict(@NotNull String address) {
        log.debug("Request to get Wallet strict: {}", address);
        return findOne(address).orElseThrow(EntityNotFoundException::new);
    }

    public Wallet findOrCreate(@NotNull String address) {
        return findOne(address).orElseGet(() -> walletRepository.save(new Wallet().setAddress(address)));
    }

    public Wallet findOrCreateCurrent() {
        return findOrCreate(SecurityUtils.getCurrentUserAddressStrict());
    }

    public Double getBlockedBalance(@NotNull String address) {
        return findOne(address)
            .map(Wallet::getBlockedAmounts)
            .orElseGet(HashSet::new)
            .stream()
            .mapToDouble(BlockedAmount::getAmount)
            .sum();
    }

    public Wallet updateLastTokensSync(Wallet wallet) {
        wallet.setLastTokensSync(Instant.now());
        return walletRepository.save(wallet);
    }

    private void saveNonceInformation(@NotNull String walletAddress, Long nonce, Instant generationDate) {
        Wallet wallet = findOrCreate(walletAddress)
            .setNonce(nonce)
            .setNonceGenerationDate(generationDate);
        walletRepository.save(wallet);
    }

    public void saveNonce(@NotNull String walletAddress, long nonce) {
        saveNonceInformation(walletAddress, nonce, Instant.now());
    }

    public void resetNonceStatus(@NotNull String walletAddress) {
        saveNonceInformation(walletAddress, null, null);
    }

    public Double getInGameBalance(@NotNull String address) {
        return findOne(address).map(Wallet::getTokenBalance).orElse(0.);
    }

    public Double getInGameBalanceForCurrent() {
        return findOne(SecurityUtils.getCurrentUserAddressStrict()).map(Wallet::getTokenBalance).orElse(0.);
    }

    public void checkHasAmountInGameForCurrent(Double amount) {
        checkHasAmountInGame(SecurityUtils.getCurrentUserAddressStrict(), amount);
    }

    public void checkHasAmountInGame(String walletAddress, Double amount) {
        Double inGameBalance = getInGameBalance(walletAddress);
        if (BigDecimal.valueOf(amount).compareTo(BigDecimal.valueOf(inGameBalance)) > 0) {
            throw new InsufficientFundsException();
        }
    }

    public void addAmountToWallet(@NotNull Wallet wallet, @NotNull Double amount) {
        walletRepository.addAmountToWallet(wallet.getId(), amount);
    }

    public void addAmountToWallet(@NotNull String walletAddress, @NotNull Double amount) {
        Wallet wallet = findOrCreate(walletAddress);
        walletRepository.addAmountToWallet(wallet.getId(), amount);
    }

    public void addAmountToCurrentWallet(@NotNull Double amount) {
        addAmountToWallet(findOrCreateCurrent(), amount);
    }

    public void subtractAmountFromWallet(@NotNull Wallet wallet, @NotNull Double amount) {
        try {
            walletRepository.subtractAmountFromWallet(wallet.getId(), amount);
        } catch (DataIntegrityViolationException ex) {
            if (ex.getMessage() != null && ex.getMessage().contains(BALANCE_NONNEGATIVE_CONSTRAINT_NAME)) {
                throw new InsufficientFundsException();
            }
            throw ex;
        }
    }

    public void subtractAmountFromCurrentWallet(@NotNull Double amount) {
        subtractAmountFromWallet(findOrCreateCurrent(), amount);
    }

    public void handleDepositRequest(@NotNull DepositRequest request) {
        transactionService.processTransactionIfNecessary(ProcessingType.DEPOSIT, request, toProcess -> {
            Double amountToDeposit = web3ServiceConnector.fromWei(toProcess.getAmount());
            addAmountToWallet(findOrCreate(toProcess.getWalletAddress()), amountToDeposit);
        });
    }
}
