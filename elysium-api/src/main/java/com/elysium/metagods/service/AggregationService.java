package com.elysium.metagods.service;

import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.dto.response.ClaimStatusResponse;
import com.elysium.metagods.service.dto.response.StakingStatusResponse;
import com.elysium.metagods.service.dto.response.VaultStatusResponse;
import com.elysium.metagods.service.entity.GodService;
import com.elysium.metagods.service.entity.WalletService;
import com.elysium.metagods.service.entity.WeaponService;
import com.elysium.metagods.service.query.GodQueryService;
import com.elysium.metagods.service.query.StakedTokenQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.stream.Stream;


@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class AggregationService {

    private final GodService godService;
    private final WeaponService weaponService;
    private final WalletService walletService;
    private final GodQueryService godQueryService;
    private final StakedTokenQueryService stakedTokenQueryService;

    public StakingStatusResponse getStakingStatus(@NotNull String address) {
        return new StakingStatusResponse(
            godService.findUnstakedForOwner(address),
            weaponService.findUnstakedForOwner(address),
            stakedTokenQueryService.findStakedTokens(ContractType.GOD, address),
            stakedTokenQueryService.findStakedTokens(ContractType.WEAPON, address)
        );
    }

    public ClaimStatusResponse getClaimStatus(@NotNull String address) {
        return new ClaimStatusResponse(
            stakedTokenQueryService.findStakedTokens(ContractType.GOD, address),
            stakedTokenQueryService.findStakedTokens(ContractType.WEAPON, address)
        );
    }

    private Double getClaimableBalance(@NotNull String address) {
        var claimsStatus = getClaimStatus(address);
        return Stream.concat(
            claimsStatus.getGodsClaims().stream(),
            claimsStatus.getWeaponsClaims().stream()
        ).mapToDouble(ClaimStatusResponse.ClaimableToken::getAmount).sum();
    }

    public VaultStatusResponse getVaultStatus(@NotNull String address) {
        return new VaultStatusResponse()
            .setInGameBalance(Math.floor(walletService.getInGameBalance(address)))
            .setBlockedBalance(Math.floor(walletService.getBlockedBalance(address)))
            .setClaimableBalance(Math.floor(getClaimableBalance(address)))
            .setGodsCount(godQueryService.countTokens(address))
            .setStakedGodsCount(stakedTokenQueryService.countStakedTokens(ContractType.GOD, address))
            .setStakedWeaponsCount(stakedTokenQueryService.countStakedTokens(ContractType.WEAPON, address));
    }

}
