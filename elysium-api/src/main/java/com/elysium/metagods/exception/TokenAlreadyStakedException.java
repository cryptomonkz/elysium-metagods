package com.elysium.metagods.exception;

import com.elysium.metagods.service.dto.request.ContractType;

public class TokenAlreadyStakedException extends InvalidRequestException {

    public TokenAlreadyStakedException(ContractType contractType, Long id) {
        super(String.format("%s token %d is already staked", contractType, id));
    }
}

