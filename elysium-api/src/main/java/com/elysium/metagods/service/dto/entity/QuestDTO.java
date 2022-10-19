package com.elysium.metagods.service.dto.entity;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

import com.elysium.metagods.domain.enumeration.GodName;
import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String onSuccessDialogue;

    @NotNull
    private String onFailDialogue;

    private StakingMode stakingMode;

    private Set<GodName> bestSuitedGods;

    private Set<GodName> partiallySuitedGods;

}
