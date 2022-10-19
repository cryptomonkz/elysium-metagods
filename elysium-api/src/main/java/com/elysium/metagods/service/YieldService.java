package com.elysium.metagods.service;


import javax.validation.constraints.NotNull;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.helper.RandomHelper;
import com.elysium.metagods.repository.StakedTokenRepository;
import com.elysium.metagods.service.dto.ClaimResultDTO;
import com.elysium.metagods.service.dto.entity.TokenDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.entity.WalletService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class YieldService {

    private static final SecureRandom SECURE_RANDOM = RandomHelper.getInitializedSecureRandom();

    private static final long DAY_IN_SECONDS = Duration.ofDays(1).getSeconds();

    private static final long MINUTE_IN_SECONDS = Duration.ofMinutes(1).getSeconds();

    private final WalletService walletService;
    private final StakedTokenRepository stakedTokenRepository;

    public Optional<ClaimResultDTO> claimYield(StakedToken stakeData) {

        long newLastClaimedOn = Instant.now().getEpochSecond();

        if (newLastClaimedOn - stakeData.getLastClaimedOn() < MINUTE_IN_SECONDS) {
            return Optional.empty();
        }

        ClaimResultDTO claimResult = calculateClaim(stakeData, newLastClaimedOn, Boolean.TRUE);

        walletService.addAmountToCurrentWallet(claimResult.getAmount());

        stakeData.setLastClaimedOn(newLastClaimedOn);
        stakedTokenRepository.save(stakeData);

        return Optional.of(claimResult);
    }

    public List<ClaimResultDTO> claimYieldWithDependencies(StakedToken stakeData) {
        List<ClaimResultDTO> claimResults = new ArrayList<>();
        claimYield(stakeData).ifPresent(claimResults::add);
        Optional.ofNullable(stakeData.getPairedToken()).flatMap(this::claimYield).ifPresent(claimResults::add);
        Optional.ofNullable(stakeData.getReversePairedToken()).flatMap(this::claimYield).ifPresent(claimResults::add);
        return claimResults;
    }

    public static ClaimResultDTO calculateClaim(StakedToken stakeData, long newLastClaimedOn, boolean withRisk) {
        if (stakeData.getGod() != null) {
            return calculatedGodYield(stakeData, newLastClaimedOn, withRisk);
        }
        if (stakeData.getWeapon() != null) {
            return calculateWeaponYield(stakeData, newLastClaimedOn);
        }
        throw new InvalidRequestException("Could not find a token on StakedToken object");
    }

    private static double calculateBaseAmount(@NotNull StakedToken stakeData, @NotNull Double rate, long newLastClaimedOn) {
        return rate * (newLastClaimedOn - stakeData.getLastClaimedOn()) / DAY_IN_SECONDS;
    }

    private static ClaimResultDTO buildClaimResult(@NotNull TokenWithTrait token, @NotNull Double amount) {
        return new ClaimResultDTO().setType(token.getCollectionType())
            .setAmount(Math.floor(amount))
            .setToken(TokenDTO.fromToken(token))
            .setWithRisk(Boolean.FALSE);
    }

    private static Optional<ClaimResultDTO> calculatedGodYieldWithRisk(StakedToken stakeData, double defaultAmount) {
        boolean didWin = RandomHelper.didGodWin(SECURE_RANDOM);

        long yieldPercentageModified = stakeData
            .getMode().getYieldPercentageModifier(ContractType.GOD, stakeData.isPaired(), didWin);

        if (yieldPercentageModified != 0) {
            double modifiedAmount = defaultAmount + (didWin ? 1 : -1) * defaultAmount * yieldPercentageModified / 100;
            ClaimResultDTO result = buildClaimResult(stakeData.getGod(), modifiedAmount)
                .setWithRisk(Boolean.TRUE).setHasWon(didWin);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    private static ClaimResultDTO calculatedGodYield(StakedToken stakeData, long newLastClaimedOn, boolean withRisk) {
        double rate = stakeData.getGod().getTrait().getGodDailyRate();
        double amount = calculateBaseAmount(stakeData, rate, newLastClaimedOn);

        return Optional
            .of(withRisk).filter(BooleanUtils::isTrue)
            .flatMap(ignored -> calculatedGodYieldWithRisk(stakeData, amount))
            .orElseGet(() -> buildClaimResult(stakeData.getGod(), amount));
    }

    private static ClaimResultDTO calculateWeaponYield(StakedToken stakeData, long newLastClaimedOn) {
        double rate = stakeData.getWeapon().getTrait().getWeaponDailyRate();
        double amount = calculateBaseAmount(stakeData, rate, newLastClaimedOn);
        return buildClaimResult(stakeData.getWeapon(), amount);
    }

}
