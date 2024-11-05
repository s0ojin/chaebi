package com.backend.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super("Requested resource not found");
    }

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundException(Throwable cause) {
        super(cause);
    }
}
