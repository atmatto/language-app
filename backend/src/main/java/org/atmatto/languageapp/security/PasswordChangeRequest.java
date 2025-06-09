package org.atmatto.languageapp.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordChangeRequest(
	@NotBlank String oldPassword,
	@Size(min = 8, max = 100) String newPassword
) {}
