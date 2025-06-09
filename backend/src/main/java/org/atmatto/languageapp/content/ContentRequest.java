package org.atmatto.languageapp.content;

import org.atmatto.languageapp.error.NotFoundException;
import org.atmatto.languageapp.history.HistoryProperty;
import org.atmatto.languageapp.language.LanguageService;
import org.atmatto.languageapp.user.User;

public record ContentRequest(
	Long language,
	String text,
	String note,
	Provenance provenance,
	Boolean ignored,
	Boolean reviewed
) {
	public Content modify(Content c, LanguageService languageService, User user) {
		if (language != null) c.setLanguage(languageService.get(language)
			.orElseThrow(() -> new NotFoundException("No such Language ID: " + language)));
		if (text != null) c.setText(text);
		if (note != null) c.setNote(note);
		if (provenance != null) c.setProvenance(provenance);
		if (ignored != null) c.setIgnored(ignored);
		if (reviewed != null && user.isReviewer()) c.setReviewed(reviewed ? new HistoryProperty(user) : null);

		if (c.getCreated() == null) c.setCreated(new HistoryProperty(user));
		c.setModified(new HistoryProperty(user));

		return c;
	}
}
