package com.elysium.metagods.service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.MINIMUM_TRANSFER_AMOUNT_MESSAGE;
import static com.elysium.metagods.service.constant.BusinessErrorMessage.RECIPIENT_ADDRESS_DOES_NOT_HAVE_A_VALID_FORMAT_MESSAGE;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import com.elysium.metagods.domain.PendingTokenSpending;
import com.elysium.metagods.domain.WalletTransferHistory;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.exception.InsufficientFundsException;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.dto.MintWeaponsSignedResponse;
import com.elysium.metagods.service.dto.TokenSpendingSignedResponse;
import com.elysium.metagods.service.dto.request.GodTokenTransferRequest;
import com.elysium.metagods.service.entity.PendingTokenSpendingService;
import com.elysium.metagods.service.entity.WalletService;
import com.elysium.metagods.service.entity.WalletTransferHistoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class TokenService {

    private final WalletService walletService;

    private final WalletTransferHistoryService walletTransferHistoryService;

    private final Web3ServiceConnector serviceConnector;

    private final PendingTokenSpendingService pendingTokenSpendingService;

    private final Web3ServiceConnector web3ServiceConnector;

    private final ValidationService validationService;

    private final ApplicationConfigurationProperties properties;

    interface SignatureGenerator {
        Optional<String> generateSignature(
            @NotNull PendingTokenSpending request, @NotNull String amountInWei, @NotNull Long timestampInSeconds
        );
    }

    public <T extends TokenSpendingSignedResponse> T signTokenSpendingRequest(
        @NotNull Long amount, @NotNull BlockedAmountReason reason,
        @NotNull SignatureGenerator generator, @NotNull Supplier<T> responseSupplier
        ) {
        PendingTokenSpending request = pendingTokenSpendingService
            .createSpendingRequest(walletService.findOrCreateCurrent(), amount, reason);
        String amountInWei = web3ServiceConnector.toWei(amount.doubleValue());
        Long timestampInSeconds = request.getGenerationDate().getEpochSecond();
        String signature = generator
            .generateSignature(request, amountInWei, timestampInSeconds)
            .orElseThrow(InvalidRequestException::new);

        T response = responseSupplier.get();
        response.setAmount(amountInWei);
        response.setSignature(signature);
        response.setRequestIdentifier(request.getId());
        response.setGenerationDate(timestampInSeconds);
        return response;
    }

    public TokenSpendingSignedResponse signWithdrawRequest(@NotNull Long amount) {
        return signTokenSpendingRequest(
            amount,
            BlockedAmountReason.WITHDRAW,
            serviceConnector::signWithdrawRequest,
            TokenSpendingSignedResponse::new
        );
    }

    public MintWeaponsSignedResponse signMintWeaponsRequest(@NotNull Long amount) {
        if(BooleanUtils.isTrue(properties.getWeb3().getWeaponMintCelestialExclusive())) {
            validationService.checkIsCelestialForCurrent();
        }
        Long mintPrice = properties.getWeb3().getWeaponPrice();
        String mintPriceInWei = web3ServiceConnector.toWei(mintPrice.doubleValue());
        return signTokenSpendingRequest(
            amount * mintPrice,
            BlockedAmountReason.MINT_WEAPONS,
            (request, amountInWei, timestamp) -> serviceConnector
                .signMintWeaponsRequest(request, amount, timestamp, mintPriceInWei),
            () -> new MintWeaponsSignedResponse().setPrice(mintPriceInWei).setMintCount(amount)
        );
    }

    public void transferGodToken(GodTokenTransferRequest transferRequest) {
        if (transferRequest.getAmount() <= 0) {
            throw new InvalidRequestException(MINIMUM_TRANSFER_AMOUNT_MESSAGE);
        }
        Boolean isRecipientAddressValid = web3ServiceConnector.validateAddress(transferRequest.getRecipient());
        if (BooleanUtils.isNotTrue(isRecipientAddressValid)) {
            throw new InvalidRequestException(RECIPIENT_ADDRESS_DOES_NOT_HAVE_A_VALID_FORMAT_MESSAGE);
        }
        if(walletService.getInGameBalanceForCurrent() < transferRequest.getAmount()) {
            throw new InsufficientFundsException();
        }
        walletService.subtractAmountFromCurrentWallet((double) transferRequest.getAmount());
        walletService.addAmountToWallet(transferRequest.getRecipient(), (double) transferRequest.getAmount());
        walletTransferHistoryService.saveEntity(
            new WalletTransferHistory().setFromAddress(SecurityUtils.getCurrentUserAddressStrict())
                                       .setToAddress(transferRequest.getRecipient())
                                       .setAmount(transferRequest.getAmount())
        );
    }

}
