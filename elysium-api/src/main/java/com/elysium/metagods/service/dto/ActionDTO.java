package com.elysium.metagods.service.dto;

import java.util.List;

public abstract class ActionDTO {

    public abstract boolean hasGodsToUpdate();

    public abstract boolean hasWeaponsToUpdate();

    public abstract List<Long> getGodsToUpdate();

    public abstract List<Long> getWeaponsToUpdate();
}

