package org.atmatto.languageapp.user;

public record UserResponseShallow(
	Long id,
	String username
) {
	public UserResponseShallow(User u) {
		this(
			u.getId(),
			u.getUsername()
		);
	}
}
