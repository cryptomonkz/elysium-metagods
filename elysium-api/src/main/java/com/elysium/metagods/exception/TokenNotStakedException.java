package com.elysium.metagods.exception;

import com.elysium.metagods.service.dto.request.ContractType;

public class TokenNotStakedException extends InvalidRequestException {

    public TokenNotStakedException(ContractType contractType, Long id) {
        super(String.format("%s token %d is not staked", contractType, id));
    }
}

