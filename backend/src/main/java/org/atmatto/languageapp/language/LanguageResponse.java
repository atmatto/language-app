package org.atmatto.languageapp.language;

public record LanguageResponse(
	Long id,
	String code,
	String name,
	String icon
) {
	LanguageResponse(Language l) {
		this(l.getId(), l.getCode(), l.getName(), l.getIcon());
	}
}
