package com.elysium.metagods.service.dto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.util.CollectionUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class ChangeStakeTypeActionDTO extends ActionDTO {

    private List<StakeGodDTO> gods = new ArrayList<>();

    @Override
    public boolean hasGodsToUpdate() {
        return !CollectionUtils.isEmpty(gods);
    }

    @Override
    public boolean hasWeaponsToUpdate() {
        return false;
    }

    @Override
    public List<Long> getGodsToUpdate() {
        return gods.stream()
                   .map(StakeGodDTO::getGodId)
                   .collect(Collectors.toList());
    }

    @Override
    public List<Long> getWeaponsToUpdate() {
        return Collections.emptyList();
    }
}

