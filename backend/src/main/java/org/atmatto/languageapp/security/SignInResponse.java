package org.atmatto.languageapp.security;

import org.atmatto.languageapp.user.UserResponseShallow;

public record SignInResponse(
	String jwt,
	UserResponseShallow user
) {}
