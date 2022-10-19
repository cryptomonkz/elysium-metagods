package com.elysium.metagods.domain.enumeration;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Gemstone {
    AGNO(1000d, 50d, 70L),
    ASTRAL(900d, 50d, 60L),
    REFLECTION(800d, 50d, 50L),
    CONJUNCTION(350d, 50d, 40L),
    AURORA(250d, 50d, 30L),
    CHAOS(230d, 50d, 20L),
    PURIFICATION(210d, 50d, 10L);

    private final Double godDailyRate;
    private final Double weaponDailyRate;
    private final Long godQuestBonus;
}

