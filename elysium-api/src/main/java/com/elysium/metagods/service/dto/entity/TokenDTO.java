package com.elysium.metagods.service.dto.entity;

import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.domain.enumeration.Gemstone;
import com.elysium.metagods.service.dto.request.ContractType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class TokenDTO {

    private String tokenId;
    private String name;
    private Gemstone trait;
    private ContractType type;

    public static TokenDTO fromToken(@NotNull TokenWithTrait token) {
        return new TokenDTO()
            .setTokenId(String.valueOf(token.getId()))
            .setName(token.getDisplayName())
            .setTrait(token.getTrait())
            .setType(token.getCollectionType());
    }

    public static <T extends TokenWithTrait> List<TokenDTO> fromTokens(@NotNull List<T> tokens) {
        return tokens.stream().map(TokenDTO::fromToken).collect(Collectors.toList());
    }

}
