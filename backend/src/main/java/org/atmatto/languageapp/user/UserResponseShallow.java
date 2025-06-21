package org.atmatto.languageapp.user;

public record UserResponseShallow(
	Long id,
	String username,
	boolean reviewer,
	boolean contentAdministrator,
	boolean userAdministrator
) {
	public UserResponseShallow(User u) {
		this(
			u.getId(),
			u.getUsername(),
			u.isReviewer(),
			u.isContentAdministrator(),
			u.isUserAdministrator()
		);
	}
}
