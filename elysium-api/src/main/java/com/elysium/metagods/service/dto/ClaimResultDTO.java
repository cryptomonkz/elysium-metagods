package com.elysium.metagods.service.dto;

import com.elysium.metagods.service.dto.entity.TokenDTO;
import com.elysium.metagods.service.dto.request.ContractType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ClaimResultDTO {

    private TokenDTO token;

    private ContractType type;

    private Double amount;

    private Boolean withRisk;

    private Boolean hasWon;

}
