package com.elysium.metagods.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TokenSpendingSignedResponse {
    private String amount;
    private String signature;
    private Long requestIdentifier;
    private Long generationDate;
}
