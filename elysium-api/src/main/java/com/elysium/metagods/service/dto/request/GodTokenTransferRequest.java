package com.elysium.metagods.service.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.MINIMUM_TRANSFER_AMOUNT_MESSAGE;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodTokenTransferRequest {

    @NotNull
    private String recipient;

    @Min(value = 1L, message = MINIMUM_TRANSFER_AMOUNT_MESSAGE)
    @NotNull
    private Long amount;

}
