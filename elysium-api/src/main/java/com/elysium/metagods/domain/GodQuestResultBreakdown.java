package com.elysium.metagods.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodQuestResultBreakdown {

    private Long basePoints;

    private Long relicBonus;

    private Long suitedGodBonus;

    private Long successChainBonus;

    private Long riskBonus;

    private Long weaponBonus;

    private Long primordialBonus;

    @JsonIgnore
    public Long getTotal() {
        return getValueOrZero(basePoints) +
               getValueOrZero(relicBonus) +
               getValueOrZero(suitedGodBonus) +
               getValueOrZero(successChainBonus) +
               getValueOrZero(riskBonus) +
               getValueOrZero(weaponBonus) +
               getValueOrZero(primordialBonus);
    }

    private long getValueOrZero(Long value) {
        return value != null ? value : 0L;
    }
}
