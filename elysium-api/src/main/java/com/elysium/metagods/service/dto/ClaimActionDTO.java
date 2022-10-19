package com.elysium.metagods.service.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class ClaimActionDTO extends ActionDTO {

    private List<Long> gods = new ArrayList<>();

    private List<Long> weapons = new ArrayList<>();

    @Override
    public boolean hasGodsToUpdate() {
        return !CollectionUtils.isEmpty(gods);
    }

    @Override
    public boolean hasWeaponsToUpdate() {
        return !CollectionUtils.isEmpty(weapons);
    }

    @Override
    public List<Long> getGodsToUpdate() {
        return gods;
    }

    @Override
    public List<Long> getWeaponsToUpdate() {
        return weapons;
    }
}

