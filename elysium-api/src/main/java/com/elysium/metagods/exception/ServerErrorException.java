package com.elysium.metagods.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@SuppressWarnings("unused")
public class ServerErrorException extends ResponseStatusException {
    public ServerErrorException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ServerErrorException(String reason) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason);
    }
}

