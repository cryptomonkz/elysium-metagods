package com.elysium.metagods.service.entity;

import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.Weapon;
import com.elysium.metagods.domain.enumeration.StakingMode;
import com.elysium.metagods.repository.StakedTokenRepository;
import com.elysium.metagods.service.ValidationService;
import com.elysium.metagods.service.YieldService;
import com.elysium.metagods.service.dto.ClaimResultDTO;
import com.elysium.metagods.service.dto.StakeGodDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service Implementation for managing {@link StakedToken}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class StakedTokenService {

    private final GodService godService;
    private final YieldService yieldService;
    private final WeaponService weaponService;
    private final StakedTokenRepository stakedTokenRepository;
    private final EntityManager entityManager;

    public void stakeGod(StakeGodDTO godDTO) {

        God god = godService.findByIdOrThrow(godDTO.getGodId());

        ValidationService.validateNotStaked(god.isStaked(), ContractType.GOD, godDTO.getGodId());

        saveStakedGod(god, godDTO.getStakingMode());
    }

    public void stakeWeapon(Long weaponId) {

        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateNotStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);

        saveStakedWeapon(weapon);
    }

    public List<ClaimResultDTO> updateStakedPairing(Long weaponId, Long godId) {

        God god = godService.findByIdOrThrow(godId);
        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, godId);
        ValidationService.validateIsStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);

        List<ClaimResultDTO> claimResults = yieldService.claimYieldWithDependencies(god.getStakeData());

        StakedToken stakedGod = god.getStakeData();
        stakedGod.setPairedToken(weapon.getStakeData());
        stakedTokenRepository.save(stakedGod);

        return claimResults;
    }

    public List<ClaimResultDTO> unstakeGod(Long godId) {

        God god = godService.findByIdOrThrow(godId);

        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, god.getId());

        List<ClaimResultDTO> claimResults = yieldService.claimYieldWithDependencies(god.getStakeData());

        deleteStakeDataEntry(god.getStakeData());

        return claimResults;
    }

    public List<ClaimResultDTO> unstakeWeapon(Long weaponId, boolean shouldClaim) {

        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateIsStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);

        List<ClaimResultDTO> claimResults = unpairWeaponAndClaim(weapon, shouldClaim);

        deleteStakeDataEntry(weapon.getStakeData());

        return claimResults;
    }

    public List<ClaimResultDTO> unstakeWeapon(Long weaponId) {
        return unstakeWeapon(weaponId, true);
    }

    public List<ClaimResultDTO> changePairing(Long weaponId, Long godId) {

        God god = godService.findByIdOrThrow(godId);
        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, godId);
        ValidationService.validateIsStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);

        List<ClaimResultDTO> claimResults = new ArrayList<>();
        claimResults.addAll(yieldService.claimYieldWithDependencies(god.getStakeData()));
        claimResults.addAll(unpairWeaponAndClaim(weapon, true));

        entityManager.flush();

        god.getStakeData().setPair(weapon.getStakeData());
        stakedTokenRepository.save(god.getStakeData());

        return claimResults;
    }

    public Optional<ClaimResultDTO> claimGodYield(Long godId) {

        God god = godService.findByIdOrThrow(godId);

        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, godId);

        return yieldService.claimYield(god.getStakeData());
    }

    public Optional<ClaimResultDTO> claimWeaponYield(Long weaponId) {

        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateIsStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);

        return yieldService.claimYield(weapon.getStakeData());
    }

    public List<ClaimResultDTO> unpairWeapon(Long weaponId) {

        Weapon weapon = weaponService.findByIdOrThrow(weaponId);

        ValidationService.validateIsStaked(weapon.isStaked(), ContractType.WEAPON, weaponId);
        ValidationService.validateIsPaired(weapon.isPaired(), ContractType.WEAPON, weaponId);

        return unpairWeaponAndClaim(weapon, true);
    }

    public List<ClaimResultDTO> changeStakeType(StakeGodDTO godDTO) {

        God god = godService.findByIdOrThrow(godDTO.getGodId());

        ValidationService.validateIsStaked(god.isStaked(), ContractType.GOD, god.getId());

        List<ClaimResultDTO> claimResults = yieldService.claimYieldWithDependencies(god.getStakeData());

        stakedTokenRepository.save(god.getStakeData().setMode(godDTO.getStakingMode()));

        return claimResults;
    }

    private void saveStakedGod(@NotNull God god, @NotNull StakingMode stakingMode) {
        stakedTokenRepository.save(
            StakedToken.getNewStakedToken()
                       .setGod(god)
                       .setMode(stakingMode)
        );
    }

    private void saveStakedWeapon(@NotNull Weapon weapon) {
        stakedTokenRepository.save(
            StakedToken.getNewStakedToken()
                       .setWeapon(weapon)
        );
    }

    private void deleteStakeDataEntry(StakedToken stakeData) {

        if (stakeData.getGod() != null) {
            God god = stakeData.getGod();
            god.setStakeData(null);
            godService.save(god);
        } else if (stakeData.getWeapon() != null) {
            Weapon weapon = stakeData.getWeapon();
            weapon.setStakeData(null);
            weaponService.save(weapon);
        }

        stakedTokenRepository.delete(stakeData);
    }

    private List<ClaimResultDTO> unpairWeaponAndClaim(Weapon weapon, boolean shouldClaim) {

        StakedToken stakedWeapon = weapon.getStakeData();

        List<ClaimResultDTO> claimResults;
        if(shouldClaim) {
            claimResults = yieldService.claimYieldWithDependencies(stakedWeapon);
        } else {
            claimResults = Collections.emptyList();
        }

        if (stakedWeapon.isPaired()) {

            StakedToken pairedGod = stakedWeapon.getReversePairedToken();
            pairedGod.unpair();
            stakedTokenRepository.save(pairedGod);
        }

        return claimResults;
    }

}
