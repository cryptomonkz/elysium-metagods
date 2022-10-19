package com.elysium.metagods.service;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.Weapon;
import com.elysium.metagods.exception.ServerErrorException;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.entity.GodService;
import com.elysium.metagods.service.entity.StakedTokenService;
import com.elysium.metagods.service.entity.WalletService;
import com.elysium.metagods.service.entity.WeaponService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class OwnerSyncService {

    private final Web3ServiceConnector web3ServiceConnector;
    private final WalletService walletService;
    private final GodService godService;
    private final WeaponService weaponService;
    private final StakedTokenService stakedTokenService;
    private final ApplicationConfigurationProperties properties;

    public void syncTokensOfOwner(String walletAddress) {
        syncTokensOfOwner(walletAddress, Boolean.TRUE);
    }

    public void syncTokensOfOwner(String walletAddress, boolean force) {

        Wallet wallet = walletService.findOrCreate(walletAddress);

        if(!force && !shouldResyncTokens(wallet)) {
            return;
        }

        syncGodTokensOfOwner(wallet);
        syncWeaponTokensOfOwner(wallet);

        walletService.updateLastTokensSync(wallet);
    }

    private boolean shouldResyncTokens(@NotNull Wallet wallet) {
        return Optional.ofNullable(wallet.getLastTokensSync())
                       .map(lastSyncDate -> lastSyncDate.plusSeconds(properties.getTokenOwner().getResyncAfterSeconds()))
                       .map(resyncAfterDate -> resyncAfterDate.isBefore(Instant.now()))
                       .orElse(Boolean.TRUE);
    }

    private void syncWeaponTokensOfOwner(Wallet wallet) {

        Long balanceOf = getBalanceOf(wallet, ContractType.WEAPON);

        weaponService.resetTokensOwner(wallet.getAddress());

        if (balanceOf == 0L) {
            return;
        }

        List<Long> weaponIds = web3ServiceConnector.getTokensForType(ContractType.WEAPON, wallet.getAddress())
                                                   .stream()
                                                   .map(Long::valueOf)
                                                   .collect(Collectors.toList());

        if (CollectionUtils.isEmpty(weaponIds)) {
            return;
        }

        List<Weapon> weapons = weaponService.findByIdIn(weaponIds);

        if (weaponIds.size() != weapons.size()) {
            throw new ServerErrorException("Failed to find all Weapons returned by contract");
        }

        weapons.forEach(weapon -> {
            if (
                weapon.hasOwner() &&
                weapon.isStaked() &&
                !weapon.getOwner().getAddress().equalsIgnoreCase(wallet.getAddress())
            ) {
                stakedTokenService.unstakeWeapon(weapon.getId(), false);
            }
            weapon.setOwner(wallet);
        });

        weaponService.saveAll(weapons);
    }

    private void syncGodTokensOfOwner(Wallet wallet) {

        Long balanceOf = getBalanceOf(wallet, ContractType.GOD);

        godService.resetTokensOwner(wallet.getAddress());

        if (balanceOf == 0L) {
            return;
        }

        List<Long> godIds = web3ServiceConnector.getTokensForType(ContractType.GOD, wallet.getAddress())
                                                .stream()
                                                .map(Long::valueOf)
                                                .collect(Collectors.toList());

        if (CollectionUtils.isEmpty(godIds)) {
            return;
        }

        List<God> gods = godService.findByIdIn(godIds);

        if (godIds.size() != gods.size()) {
            throw new ServerErrorException("Failed to find all Gods returned by contract");
        }

        gods.forEach(god -> god.setOwner(wallet));

        godService.saveAll(gods);
    }

    private Long getBalanceOf(Wallet wallet, ContractType contractType) {
        return web3ServiceConnector
            .getBalanceOf(contractType, wallet.getAddress())
            .orElseThrow(() -> new ServerErrorException(
                             String.format(
                                 "Unexpected output of %s balanceOf",
                                 contractType
                             )
                         )
            );
    }

}
