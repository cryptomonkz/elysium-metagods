package com.elysium.metagods.service.dto.response;

import javax.validation.constraints.NotNull;
import java.util.List;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.service.dto.StakedTokenDetails;
import com.elysium.metagods.service.dto.entity.TokenDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class StakingStatusResponse {

    private List<TokenDTO> gods;

    private List<TokenDTO> weapons;

    private List<StakedTokenDetails> stakedGods;

    private List<StakedTokenDetails> stakedWeapons;

    public <T extends TokenWithTrait, G extends TokenWithTrait> StakingStatusResponse(
        @NotNull List<T> gods,
        @NotNull List<G> weapons,
        @NotNull List<StakedToken> stakedGods,
        @NotNull List<StakedToken> stakedWeapons
    ) {
        this.gods = TokenDTO.fromTokens(gods);
        this.weapons = TokenDTO.fromTokens(weapons);
        this.stakedGods = StakedTokenDetails.fromStakedTokens(stakedGods);
        this.stakedWeapons = StakedTokenDetails.fromStakedTokens(stakedWeapons);
    }
}
