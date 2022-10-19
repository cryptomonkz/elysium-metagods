package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.PendingTokenSpending;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.domain.enumeration.ProcessingType;
import com.elysium.metagods.repository.PendingTokenSpendingRepository;
import com.elysium.metagods.service.OwnerSyncService;
import com.elysium.metagods.service.dto.request.SpendingFinishedRequest;
import com.elysium.metagods.service.query.PendingTokenSpendingQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.time.Instant;

/**
 * Service Implementation for managing {@link PendingTokenSpending}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class PendingTokenSpendingService {

    private final BlockedAmountService blockedAmountService;
    private final PendingTokenSpendingRepository pendingTokenSpendingRepository;
    private final ProcessedTransactionService processedTransactionService;
    private final PendingTokenSpendingQueryService tokenSpendingQueryService;
    private final OwnerSyncService ownerSyncService;

    public PendingTokenSpending createSpendingRequest(
        @NotNull Wallet wallet, @NotNull Long amountToSpend, @NotNull BlockedAmountReason reason
    ) {
        BlockedAmount blockedAmount = blockedAmountService
            .blockAmount(wallet, amountToSpend.doubleValue(), reason);
        PendingTokenSpending pendingTokenSpending = new PendingTokenSpending()
            .setBlockedAmount(blockedAmount).setGenerationDate(Instant.now());
        return pendingTokenSpendingRepository.save(pendingTokenSpending);
    }

    private void finishPendingSpending(
        @NotNull PendingTokenSpending tokenSpending, @NotNull Boolean wasSuccessful
    ) {
        BlockedAmount blockedAmount = tokenSpending.getBlockedAmount();
        pendingTokenSpendingRepository.delete(tokenSpending);
        if (BooleanUtils.isTrue(wasSuccessful)) {
            blockedAmountService.unblockAmount(blockedAmount);
        } else {
            blockedAmountService.revertAmount(blockedAmount);
        }
    }

    private void handleSpendingRequest(@NotNull SpendingFinishedRequest request) {
        pendingTokenSpendingRepository.findById(request.getRequestIdentifier()).ifPresentOrElse(
            pendingSpending -> finishPendingSpending(pendingSpending, request.getWasRequestSuccessful()),
            () -> log.error("Identifier {} for spending request request was not found.", request.getRequestIdentifier())
        );
    }

    public void handleWithdrawRequest(@NotNull SpendingFinishedRequest request) {
        processedTransactionService
            .processTransactionIfNecessary(ProcessingType.WITHDRAW, request, this::handleSpendingRequest);
    }

    public void handleMintWeaponsRequest(@NotNull SpendingFinishedRequest request) {
        processedTransactionService
            .processTransactionIfNecessary(ProcessingType.MINT_WEAPONS, request, this::handleSpendingRequest);
        ownerSyncService.syncTokensOfOwner(request.getWalletAddress(), Boolean.TRUE);
    }

    public void cancelExpiredSpendingRequests(@NotNull BlockedAmountReason reason) {
        tokenSpendingQueryService.findExpiredPendingSpendings(reason)
            .forEach(pendingSpending -> finishPendingSpending(pendingSpending, Boolean.FALSE));
    }

}
