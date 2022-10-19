package com.elysium.metagods.exception;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.OUT_OF_STOCK_ERROR_MESSAGE;

@SuppressWarnings("unused")
public class OutOfStockException extends InvalidRequestException {

    public OutOfStockException() {
        super(OUT_OF_STOCK_ERROR_MESSAGE);
    }
}

