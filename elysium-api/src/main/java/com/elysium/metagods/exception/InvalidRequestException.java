package com.elysium.metagods.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@SuppressWarnings("unused")
public class InvalidRequestException  extends ResponseStatusException {
    public InvalidRequestException() {
        super(HttpStatus.BAD_REQUEST);
    }

    public InvalidRequestException(String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }
}

