package com.elysium.metagods.service.dto;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.util.CollectionUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class StakeActionDTO extends ActionDTO {

    @Valid
    private List<StakeGodDTO> stakedGods = new ArrayList<>();

    private List<Long> stakedWeapons = new ArrayList<>();

    @Valid
    private List<StakePairingDTO> stakedPairings = new ArrayList<>();

    @Override
    public boolean hasGodsToUpdate() {
        return !CollectionUtils.isEmpty(stakedPairings) ||
               !CollectionUtils.isEmpty(stakedGods);
    }

    @Override
    public boolean hasWeaponsToUpdate() {
        return !CollectionUtils.isEmpty(stakedPairings) ||
               !CollectionUtils.isEmpty(stakedWeapons);
    }

    @Override
    public List<Long> getGodsToUpdate() {
        return Stream.of(
            stakedGods.stream().map(StakeGodDTO::getGodId),
            stakedPairings.stream().map(StakePairingDTO::getGodId)
        )
                     .flatMap(stream -> stream)
                     .distinct()
                     .collect(Collectors.toList());
    }

    @Override
    public List<Long> getWeaponsToUpdate() {
        return Stream.of(
            stakedWeapons.stream(),
            stakedPairings.stream().map(StakePairingDTO::getWeaponId)
        )
                     .flatMap(stream -> stream)
                     .distinct()
                     .collect(Collectors.toList());
    }
}

