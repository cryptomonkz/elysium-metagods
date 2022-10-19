package com.elysium.metagods.service.dto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.domain.enumeration.StakingMode;
import com.elysium.metagods.service.dto.entity.TokenDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class StakedTokenDetails {

    private TokenDTO token;

    private TokenDTO pairedToken;

    private StakingMode stakeType;

    public static StakedTokenDetails fromTokenWithTrait(@NotNull TokenWithTrait tokenWithTrait) {
        StakedTokenDetails response = new StakedTokenDetails();
        response.setFields(tokenWithTrait);
        return response;
    }

    public static List<StakedTokenDetails> fromTokenWithTrait(@NotNull List<? extends TokenWithTrait> tokenWithTraits) {
        return tokenWithTraits.stream().map(StakedTokenDetails::fromTokenWithTrait).collect(Collectors.toList());
    }

    public static StakedTokenDetails fromStakedToken(@NotNull StakedToken stakedToken) {
        StakedTokenDetails response = new StakedTokenDetails();
        response.setFields(stakedToken.extractStakedToken());
        return response;
    }

    public static List<StakedTokenDetails> fromStakedTokens(@NotNull List<StakedToken> stakedTokens) {
        return stakedTokens.stream().map(StakedTokenDetails::fromStakedToken).collect(Collectors.toList());
    }

    protected void setFields(@NotNull TokenWithTrait tokenWithTrait) {
        if (tokenWithTrait.getStakeData() != null) {
            StakedToken stakedToken = tokenWithTrait.getStakeData();
            this.setStakeType(stakedToken.getMode());
            Stream
                .concat(
                    Optional.ofNullable(stakedToken.getPairedToken()).stream(),
                    Optional.ofNullable(stakedToken.getReversePairedToken()).stream()
                )
                .map(StakedToken::extractStakedToken)
                .map(TokenDTO::fromToken)
                .findFirst()
                .ifPresent(this::setPairedToken);
        }
        this.setToken(TokenDTO.fromToken(tokenWithTrait));
    }
}
