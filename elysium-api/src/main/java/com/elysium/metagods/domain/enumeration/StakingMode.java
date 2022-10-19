package com.elysium.metagods.domain.enumeration;

import java.util.Map;

import com.elysium.metagods.service.dto.request.ContractType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum StakingMode {

    STRATEGIC_DEFENSIVE(
        Map.of(
                ContractType.GOD, Map.of(false, Map.of(false, 0L, true, 0L), true, Map.of(false, 0L, true, 0L)),
                ContractType.WEAPON, Map.of(false, Map.of(false, 0L, true, 0L), true, Map.of(false, 0L, true, 0L))
        ),
        new QuestSuccessChanceInterval(90, 100)
    ),
    OPTIMAL_OFFENSIVE(
        Map.of(
                ContractType.GOD, Map.of(false, Map.of(false, 10L, true, 20L), true, Map.of(false, 5L, true, 30L)),
                ContractType.WEAPON, Map.of(false, Map.of(false, 0L, true, 0L), true, Map.of(false, 0L, true, 0L))
        ),
        new QuestSuccessChanceInterval(75, 90)
    ),
    FRONTLINE_OFFENSIVE(
        Map.of(
                ContractType.GOD, Map.of(false, Map.of(false, 50L, true, 50L), true, Map.of(false, 20L, true, 70L)),
                ContractType.WEAPON, Map.of(false, Map.of(false, 0L, true, 0L), true, Map.of(false, 0L, true, 0L))
        ),
        new QuestSuccessChanceInterval(50, 75)
    );

    // collection => isPaired => didWin => percentage
    final Map<ContractType, Map<Boolean, Map<Boolean, Long>>> yieldPercentageModifierMap;

    final QuestSuccessChanceInterval questSuccessChanceInterval;

    public Long getYieldPercentageModifier(ContractType contractType, boolean isPaired, boolean didWin) {
        return yieldPercentageModifierMap.get(contractType).get(isPaired).get(didWin);
    }

    public QuestSuccessChanceInterval getQuestSuccessChanceInterval() {
        return questSuccessChanceInterval;
    }

    @Getter
    @AllArgsConstructor
    public static class QuestSuccessChanceInterval {
        private final Integer min;
        private final Integer max;
    }
}
