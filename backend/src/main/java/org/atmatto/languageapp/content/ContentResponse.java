package org.atmatto.languageapp.content;

import org.atmatto.languageapp.history.HistoryPropertyResponse;

public record ContentResponse(
	Long id,
	Long language,
	String text,
	String note,
	Provenance provenance,
	Boolean ignored,
	HistoryPropertyResponse created,
	HistoryPropertyResponse modified,
	HistoryPropertyResponse reviewed
) {
	public ContentResponse(Content c) {
		this(
			c.getId(),
			c.getLanguage().getId(),
			c.getText(),
			c.getNote(),
			c.getProvenance(),
			c.getIgnored(),
			new HistoryPropertyResponse(c.getCreated()),
			new HistoryPropertyResponse(c.getModified()),
			c.getReviewed() == null ? null : new HistoryPropertyResponse(c.getReviewed())
		);
	}
}
