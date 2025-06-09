package org.atmatto.languageapp.security;

import jakarta.validation.constraints.Size;
import org.atmatto.languageapp.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public record RegisterRequest(
	String username,
	@Size(min = 8, max = 100) String password
) {
	public User toUser(PasswordEncoder pe) {
		User u = new User();
		u.setUsername(username);
		u.setPasswordHash(pe.encode(password));
		return u;
	}
}
