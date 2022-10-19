package com.elysium.metagods.exception;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.NOT_ENOUGH_FUNDS_ERROR_MESSAGE;

@SuppressWarnings("unused")
public class InsufficientFundsException extends InvalidRequestException {

    public InsufficientFundsException() {
        super(NOT_ENOUGH_FUNDS_ERROR_MESSAGE);
    }
}

