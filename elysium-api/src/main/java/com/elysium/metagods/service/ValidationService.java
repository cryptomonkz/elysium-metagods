package com.elysium.metagods.service;


import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.COULD_NOT_CONFIRM_THE_OWNERSHIP_OF_TOKENS_MESSAGE;
import static com.elysium.metagods.service.constant.BusinessErrorMessage.TOURNAMENT_NOT_OPEN_FOR_ENROLLMENT;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.exception.ForbiddenRequestException;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.exception.ServerErrorException;
import com.elysium.metagods.exception.TokenAlreadyStakedException;
import com.elysium.metagods.exception.TokenNotPairedException;
import com.elysium.metagods.exception.TokenNotStakedException;
import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.constant.ContractMethod;
import com.elysium.metagods.service.dto.request.ContractType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ValidationService {

    private final Web3ServiceConnector web3ServiceConnector;

    public void checkIsCelestialForCurrent() {
        checkIsCelestial(SecurityUtils.getCurrentUserAddressStrict());
    }

    public void checkIsCelestial(String walletAddress) {

        CompletableFuture<Long> ownedPassesAsync = CompletableFuture.supplyAsync(
            () -> web3ServiceConnector
                .getBalanceOf(
                    ContractType.MINTPASS,
                    walletAddress,
                    ContractMethod.MintPassStakingMethod.MINTPASS_TOKEN_ID
                )
                .orElse(0L)
        );
        CompletableFuture<Long> stakedPassesAsync = CompletableFuture.supplyAsync(
            () -> web3ServiceConnector.getNumberOfStakedMintpasses(walletAddress).orElse(0L)
        );

        boolean isNotCelestial;
        try {
            isNotCelestial = 0 >= ownedPassesAsync.get() + stakedPassesAsync.get();
        } catch (Exception e) {
            String errorMessage = "Could not check celestial status for " + walletAddress;
            log.error(errorMessage, e);
            throw new ServerErrorException(errorMessage);
        }
        if(isNotCelestial) {
            throw new InvalidRequestException(walletAddress + " is not celestial");
        }
    }

    public void checkOwnership(@NotNull ContractType contractType, @NotNull Long tokenId) {
        checkOwnership(contractType, List.of(tokenId));
    }

    public void checkOwnership(@NotNull ContractType contractType, @NotNull List<Long> batch) {
        Boolean isOwner = web3ServiceConnector.isOwnerOfBatch(contractType, batch).orElse(Boolean.FALSE);
        if (BooleanUtils.isNotTrue(isOwner)) {
            throw new ForbiddenRequestException(String.format(
                COULD_NOT_CONFIRM_THE_OWNERSHIP_OF_TOKENS_MESSAGE, contractType.name()
            ));
        }
    }

    public static void validateIsStaked(boolean staked, ContractType contractType, Long tokenId) {
        if (!staked) {
            throw new TokenNotStakedException(contractType, tokenId);
        }
    }

    public static void validateNotStaked(boolean staked, ContractType contractType, Long tokenId) {
        if (staked) {
            throw new TokenAlreadyStakedException(contractType, tokenId);
        }
    }

    public static void validateIsPaired(boolean staked, ContractType contractType, Long tokenId) {
        if (!staked) {
            throw new TokenNotPairedException(contractType, tokenId);
        }
    }

    public static void validateIsEnrollmentOpen(Tournament tournament) {
        if (!tournament.isEnrollmentWindowOpen()) {
            throw new InvalidRequestException(String.format(TOURNAMENT_NOT_OPEN_FOR_ENROLLMENT, tournament.getId()));
        }
    }

}
