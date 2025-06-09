package org.atmatto.languageapp.security;

import org.atmatto.languageapp.user.User;
import org.atmatto.languageapp.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class Authenticator {
	private final PasswordEncoder passwordEncoder;
	private final UserService userService;

	private static final String USER_NOT_FOUND_PASSWORD = "userNotFoundPassword";
	private final String userNotFoundEncodedPassword;

	public Authenticator(PasswordEncoder passwordEncoder, UserService userService) {
		this.passwordEncoder = passwordEncoder;
		this.userService = userService;
		userNotFoundEncodedPassword = passwordEncoder.encode(USER_NOT_FOUND_PASSWORD);
	}

	public boolean authenticate(User u, String password) {
		String hash = u != null ? u.getPasswordHash() : userNotFoundEncodedPassword;
		return passwordEncoder.matches(password, hash) && u != null;
	}

	public Optional<User> authenticate(String username, String password) {
		return userService.get(username).<Optional<User>>map(u -> {
			if (passwordEncoder.matches(password, u.getPasswordHash())) {
				return Optional.of(u);
			} else {
				return Optional.empty();
			}
		}).orElseGet(() -> {
			passwordEncoder.matches(password, userNotFoundEncodedPassword); // Mitigate against timing attack
			return Optional.empty();
		});
	}
}
