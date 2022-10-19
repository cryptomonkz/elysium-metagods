package com.elysium.metagods.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@SuppressWarnings("unused")
public class ForbiddenRequestException  extends ResponseStatusException {
    public ForbiddenRequestException() {
        super(HttpStatus.FORBIDDEN);
    }

    public ForbiddenRequestException(String reason) {
        super(HttpStatus.FORBIDDEN, reason);
    }
}

