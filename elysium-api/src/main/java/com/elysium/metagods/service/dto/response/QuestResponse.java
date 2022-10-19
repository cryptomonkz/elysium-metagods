package com.elysium.metagods.service.dto.response;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestResponse implements Serializable {

    @NotNull
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

}
