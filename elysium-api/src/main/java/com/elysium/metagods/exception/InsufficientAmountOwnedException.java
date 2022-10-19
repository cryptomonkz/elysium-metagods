package com.elysium.metagods.exception;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.INSUFFICIENT_AMOUNT_ERROR_MESSAGE;

@SuppressWarnings("unused")
public class InsufficientAmountOwnedException extends InvalidRequestException {

    public InsufficientAmountOwnedException() {
        super(INSUFFICIENT_AMOUNT_ERROR_MESSAGE);
    }
}

