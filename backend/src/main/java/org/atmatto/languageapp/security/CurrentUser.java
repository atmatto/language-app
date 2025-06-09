package org.atmatto.languageapp.security;

import org.atmatto.languageapp.error.AuthenticationException;
import org.atmatto.languageapp.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrentUser {
	private static final Logger logger = LoggerFactory.getLogger(CurrentUser.class);

	public static User getOrThrow() {
		Authentication a = SecurityContextHolder.getContext().getAuthentication();
		if (a == null || !a.isAuthenticated()) {
			throw new AuthenticationException("User must be authenticated");
		}
		Object principal = a.getPrincipal();
		if (!(principal instanceof User)) {
			logger.error("Authenticated principal is not an object of class User: {}", principal);
			throw new AuthenticationException("User must be properly authenticated");
		}
		return (User)principal;
	}
}
