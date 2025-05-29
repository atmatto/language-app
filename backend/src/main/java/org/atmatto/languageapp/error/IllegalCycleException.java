package org.atmatto.languageapp.error;

import lombok.experimental.StandardException;

// TODO: Add to GlobalExceptionHandler
@StandardException
public class IllegalCycleException extends RuntimeException {
}
