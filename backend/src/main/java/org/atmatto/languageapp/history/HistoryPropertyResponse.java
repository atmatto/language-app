package org.atmatto.languageapp.history;

import org.atmatto.languageapp.user.UserResponseShallow;

import java.time.Instant;

public record HistoryPropertyResponse(
//	Long id,
	UserResponseShallow user,
	Instant timestamp
) {
	public HistoryPropertyResponse(HistoryProperty hp) {
		this(
//			hp.getId(),
			new UserResponseShallow(hp.getUser()),
			hp.getTimestamp()
		);
	}
}
