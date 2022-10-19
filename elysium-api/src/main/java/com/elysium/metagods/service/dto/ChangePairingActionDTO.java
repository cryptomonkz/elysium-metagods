package com.elysium.metagods.service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class ChangePairingActionDTO extends ActionDTO {

    private List<StakePairingDTO> pairedWeapons = new ArrayList<>();

    private List<Long> weapons = new ArrayList<>();

    @Override
    public boolean hasGodsToUpdate() {
        return !CollectionUtils.isEmpty(weapons);
    }

    @Override
    public boolean hasWeaponsToUpdate() {
        return !CollectionUtils.isEmpty(weapons) || !CollectionUtils.isEmpty(pairedWeapons);
    }

    @Override
    public List<Long> getGodsToUpdate() {
        return pairedWeapons.stream()
                            .map(StakePairingDTO::getGodId)
                            .collect(Collectors.toList());
    }

    @Override
    public List<Long> getWeaponsToUpdate() {
        return Stream.of(
            weapons.stream(),
            pairedWeapons.stream().map(StakePairingDTO::getWeaponId)
        ).flatMap(stream -> stream).collect(Collectors.toList());
    }
}

