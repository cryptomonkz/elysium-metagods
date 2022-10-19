package com.elysium.metagods.service.dto.request;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AssignQuestToGodRequest {

    @NotNull
    private Long godId;

    @NotNull
    private Long questId;

}
