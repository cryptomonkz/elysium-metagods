package com.elysium.metagods.service;


import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.dto.ActionDTO;
import com.elysium.metagods.service.dto.ChangePairingActionDTO;
import com.elysium.metagods.service.dto.ChangeStakeTypeActionDTO;
import com.elysium.metagods.service.dto.ClaimActionDTO;
import com.elysium.metagods.service.dto.ClaimResultDTO;
import com.elysium.metagods.service.dto.StakeActionDTO;
import com.elysium.metagods.service.dto.StakeGodDTO;
import com.elysium.metagods.service.dto.StakePairingDTO;
import com.elysium.metagods.service.dto.UnstakeActionDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import com.elysium.metagods.service.entity.StakedTokenService;
import com.elysium.metagods.service.query.StakedTokenQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class StakingService {

    private final StakedTokenService stakedTokenService;
    private final StakedTokenQueryService stakedTokenQueryService;
    private final YieldService yieldService;
    private final ValidationService validationService;

    public List<ClaimResultDTO> stakeTokens(@Validated StakeActionDTO stakeActionDTO) {

        checkGodsOwnership(stakeActionDTO);
        checkWeaponsOwnership(stakeActionDTO);

        List<ClaimResultDTO> claimResults = new ArrayList<>();

        for (StakeGodDTO unpairedGod : stakeActionDTO.getStakedGods()) {
            stakedTokenService.stakeGod(unpairedGod);
        }

        for (Long unpairedWeaponId : stakeActionDTO.getStakedWeapons()) {
            stakedTokenService.stakeWeapon(unpairedWeaponId);
        }

        for (StakePairingDTO stakedPairingDTO : stakeActionDTO.getStakedPairings()) {
            claimResults.addAll(
                stakedTokenService.updateStakedPairing(
                    stakedPairingDTO.getWeaponId(),
                    stakedPairingDTO.getGodId()
                )
            );
        }

        return claimResults;
    }

    public List<ClaimResultDTO> unstakeTokens(UnstakeActionDTO unstakeActionDTO) {

        checkGodsOwnership(unstakeActionDTO);
        checkWeaponsOwnership(unstakeActionDTO);

        List<ClaimResultDTO> claimResults = new ArrayList<>();

        for (Long godId : unstakeActionDTO.getGods()) {
            claimResults.addAll(stakedTokenService.unstakeGod(godId));
        }

        for (Long weaponId : unstakeActionDTO.getWeapons()) {
            claimResults.addAll(stakedTokenService.unstakeWeapon(weaponId));
        }

        return claimResults;
    }

    public List<ClaimResultDTO> changePairings(@Valid ChangePairingActionDTO changeStakeTypeActionDTO) {

        checkGodsOwnership(changeStakeTypeActionDTO);
        checkWeaponsOwnership(changeStakeTypeActionDTO);

        List<ClaimResultDTO> claimResults = new ArrayList<>();

        for (StakePairingDTO changeTokenPairingDTO : changeStakeTypeActionDTO.getPairedWeapons()) {
            claimResults.addAll(
                stakedTokenService.changePairing(
                    changeTokenPairingDTO.getWeaponId(),
                    changeTokenPairingDTO.getGodId()
                )
            );
        }

        for (Long weaponId : changeStakeTypeActionDTO.getWeapons()) {
            claimResults.addAll(stakedTokenService.unpairWeapon(weaponId));
        }

        return claimResults;
    }

    public List<ClaimResultDTO> changeStakeType(ChangeStakeTypeActionDTO changeStakeTypeActionDTO) {

        checkGodsOwnership(changeStakeTypeActionDTO);

        List<ClaimResultDTO> claimResults = new ArrayList<>();

        for (StakeGodDTO godDTO : changeStakeTypeActionDTO.getGods()) {
            claimResults.addAll(stakedTokenService.changeStakeType(godDTO));
        }

        return claimResults;
    }

    public List<ClaimResultDTO> claimYield(ClaimActionDTO claimActionDTO) {

        checkGodsOwnership(claimActionDTO);
        checkWeaponsOwnership(claimActionDTO);

        List<ClaimResultDTO> claimResults = new ArrayList<>();

        for (Long godId : claimActionDTO.getGods()) {
            stakedTokenService.claimGodYield(godId).ifPresent(claimResults::add);
        }

        for (Long weaponId : claimActionDTO.getWeapons()) {
            stakedTokenService.claimWeaponYield(weaponId).ifPresent(claimResults::add);
        }

        return claimResults;
    }

    public List<ClaimResultDTO> claimYieldForAll() {

        String walletAddress = SecurityUtils.getCurrentUserAddressStrict();

        return Stream.of(
            stakedTokenQueryService.findStakedTokens(ContractType.GOD, walletAddress),
            stakedTokenQueryService.findStakedTokens(ContractType.WEAPON, walletAddress)
        )
                     .flatMap(Collection::stream)
                     .map(yieldService::claimYield)
                     .filter(Optional::isPresent)
                     .map(Optional::get)
                     .collect(Collectors.toList());
    }

    private void checkGodsOwnership(ActionDTO actionDTO) {
        if (actionDTO.hasGodsToUpdate()) {
            validationService.checkOwnership(ContractType.GOD, actionDTO.getGodsToUpdate());
        }
    }

    private void checkWeaponsOwnership(ActionDTO actionDTO) {
        if (actionDTO.hasWeaponsToUpdate()) {
            validationService.checkOwnership(ContractType.WEAPON, actionDTO.getWeaponsToUpdate());
        }
    }

}
