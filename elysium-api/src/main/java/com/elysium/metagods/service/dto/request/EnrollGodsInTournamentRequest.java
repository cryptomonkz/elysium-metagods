package com.elysium.metagods.service.dto.request;

import javax.validation.constraints.NotEmpty;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnrollGodsInTournamentRequest {

    @NotEmpty
    private List<Long> gods;

}
