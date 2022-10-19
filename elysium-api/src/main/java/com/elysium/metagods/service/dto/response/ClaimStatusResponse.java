package com.elysium.metagods.service.dto.response;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.service.YieldService;
import com.elysium.metagods.service.dto.entity.TokenDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ClaimStatusResponse {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Accessors(chain = true)
    public static class ClaimableToken {
        private TokenDTO token;
        private Double amount;

        private static ClaimableToken fromStakedToken(@NotNull StakedToken stakedToken) {
            Double claimableAmount = YieldService
                .calculateClaim(stakedToken, Instant.now().getEpochSecond(), Boolean.FALSE).getAmount();
            return new ClaimStatusResponse.ClaimableToken()
                .setToken(TokenDTO.fromToken(stakedToken.extractStakedToken()))
                .setAmount(Math.floor(claimableAmount));
        }

        private static List<ClaimableToken> fromStakedTokens(@NotNull List<StakedToken> stakedTokens) {
            return stakedTokens.stream().map(ClaimableToken::fromStakedToken).collect(Collectors.toList());
        }
    }

    private List<ClaimableToken> godsClaims;
    private List<ClaimableToken> weaponsClaims;

    public ClaimStatusResponse(@NotNull List<StakedToken> stakedGods, @NotNull List<StakedToken> stakedWeapons) {
        this.godsClaims = ClaimableToken.fromStakedTokens(stakedGods);
        this.weaponsClaims = ClaimableToken.fromStakedTokens(stakedWeapons);
    }

}
