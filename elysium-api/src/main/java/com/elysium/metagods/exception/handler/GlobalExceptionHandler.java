package com.elysium.metagods.exception.handler;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotNull;
import java.util.stream.Collectors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

@Slf4j
@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    public static final String API_EXCEPTION_LOG_MESSAGE = "API exception raised: {}";

    private static ResponseEntity<String> buildExceptionResponse(
            @NotNull Throwable throwable,
            @NotNull String message,
            @NotNull HttpStatus status
    ) {
        log.error(API_EXCEPTION_LOG_MESSAGE, message, throwable);
        return new ResponseEntity<>(message, status);
    }

    private static String getExceptionDetails(@NotNull ConstraintViolationException ex) {
        return ex.getConstraintViolations().stream().map(constraintViolation -> String.format(
                "Invalid value %s - %s.", constraintViolation.getInvalidValue(), constraintViolation.getMessage()
        )).collect(Collectors.joining(StringUtils.SPACE));
    }

    private static String getExceptionDetails(@NotNull MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getAllErrors().stream().map((ObjectError error) -> {
            String fieldName = error instanceof FieldError ? ((FieldError) error).getField() : error.getObjectName();
            return String.format("%s validation failed: %s", fieldName, error.getDefaultMessage());

        }).collect(Collectors.joining(", "));
    }

    /**
     * Generic Throwable handler
     */
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> handleException(
            Throwable throwable, WebRequest webRequest
    ) {
        return buildExceptionResponse(throwable, throwable.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Generic ResponseStatusException handler
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleException(
            ResponseStatusException exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, exception.getReason(), exception.getStatus());
    }

    @ExceptionHandler({
            EntityNotFoundException.class,
    })
    public ResponseEntity<String> handleNotFoundException(
            Throwable exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
    })
    public ResponseEntity<String> handleBadRequestException(
            Throwable exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleCustomBadRequestException(
            ConstraintViolationException exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, getExceptionDetails(exception), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleCustomBadRequestException(
            MethodArgumentNotValidException exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, getExceptionDetails(exception), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            AccessDeniedException.class,

    })
    public ResponseEntity<String> handleForbiddenException(
            Throwable exception, WebRequest request
    ) {
        return buildExceptionResponse(exception, exception.getMessage(), HttpStatus.FORBIDDEN);
    }

}
