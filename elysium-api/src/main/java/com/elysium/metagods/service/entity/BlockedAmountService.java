package com.elysium.metagods.service.entity;

import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.BlockedAmount;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.repository.BlockedAmountRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Implementation for managing {@link BlockedAmount}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class BlockedAmountService {

    private final WalletService walletService;
    private final BlockedAmountRepository blockedAmountRepository;

    public BlockedAmount blockAmount(
        @NotNull Wallet wallet, @NotNull Double amount, @NotNull BlockedAmountReason reason
    ) {

        walletService.checkHasAmountInGameForCurrent(amount);
        BlockedAmount blockedAmount = new BlockedAmount()
            .setWallet(wallet)
            .setAmount(amount)
            .setReason(reason);
        walletService.subtractAmountFromWallet(wallet, amount);
        return blockedAmountRepository.save(blockedAmount);
    }

    public void unblockAmount(@NotNull BlockedAmount blockedAmount) {
        log.info(
            "Unblocking amount <{}> for wallet <{}>",
            blockedAmount.getAmount(), blockedAmount.getWallet().getAddress()
        );
        blockedAmountRepository.delete(blockedAmount);
    }

    public void revertAmount(@NotNull BlockedAmount blockedAmount) {
        log.info(
            "Reverting amount <{}> for wallet <{}>",
            blockedAmount.getAmount(), blockedAmount.getWallet().getAddress()
        );
        walletService.addAmountToWallet(blockedAmount.getWallet(), blockedAmount.getAmount());
        unblockAmount(blockedAmount);
    }

}
