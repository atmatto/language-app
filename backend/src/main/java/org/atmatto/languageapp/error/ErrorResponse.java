package org.atmatto.languageapp.error;

public record ErrorResponse(
	ErrorId id,
	String reason
) {}
