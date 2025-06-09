package org.atmatto.languageapp.error;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(ConstraintViolationException e) {
		String msg = e.getConstraintViolations().stream()
			.map(cv -> cv.getPropertyPath().toString() + ": " + cv.getMessage())
			.collect(Collectors.joining(", "));
		return new ResponseEntity<>(new ErrorResponse(ErrorId.VALIDATION, msg), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleArgumentValidationException(MethodArgumentNotValidException e) {
		String msg = e.getFieldErrors().stream()
			.map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
			.collect(Collectors.joining(", "));
		return new ResponseEntity<>(new ErrorResponse(ErrorId.VALIDATION, msg), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(UnrecognizedPropertyException.class)
	public ResponseEntity<ErrorResponse> handleUnrecognizedProperty(UnrecognizedPropertyException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.UNRECOGNIZED_PROP, "Unrecognized field: " + e.getPropertyName()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(JsonParseException.class)
	public ResponseEntity<ErrorResponse> handleJsonParseException(JsonParseException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.INVALID_JSON, "Invalid JSON: " + e.getOriginalMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(JsonMappingException.class)
	public ResponseEntity<ErrorResponse> handleJsonMappingException(JsonMappingException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.JSON_MAPPING,
			"Invalid value: "
				+ e.getPath().stream().map(JsonMappingException.Reference::getFieldName).collect(Collectors.joining(", "))),
			HttpStatus.BAD_REQUEST);
	}

//	// TODO: Remove
//	@ExceptionHandler(HttpMessageNotReadableException.class)
//	public ResponseEntity<ErrorResponse> handleMessageNotReadable(HttpMessageNotReadableException e) {
////		throw e;
//		return new ResponseEntity<>(new ErrorResponse("Not readable: " + e.getCause()), HttpStatus.BAD_REQUEST);
//	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException e) {
		logger.error("Data integrity violation", e);
		return new ResponseEntity<>(new ErrorResponse(ErrorId.INTEGRITY, "Data integrity violation"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.NOT_FOUND, e.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(ConflictException.class)
	public ResponseEntity<ErrorResponse> handleConflictException(ConflictException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.CONFLICT, e.getMessage()), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e) {
		return new ResponseEntity<>(new ErrorResponse(ErrorId.AUTH, e.getMessage()), HttpStatus.UNAUTHORIZED);
	}
}
