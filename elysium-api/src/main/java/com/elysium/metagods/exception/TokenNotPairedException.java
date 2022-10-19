package com.elysium.metagods.exception;

import com.elysium.metagods.service.dto.request.ContractType;

public class TokenNotPairedException extends InvalidRequestException {

    public TokenNotPairedException(ContractType contractType, Long id) {
        super(String.format("%s token %d is not paired", contractType, id));
    }
}

