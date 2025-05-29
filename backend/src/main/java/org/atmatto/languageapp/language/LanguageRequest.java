package org.atmatto.languageapp.language;

public record LanguageRequest(
	String code,
	String name,
	String icon
) {
	public Language toLanguage(Long id) {
		return new Language(id, code, name, icon);
	}

	public Language modify(Language l) {
		if (code != null) l.setCode(code);
		if (name != null) l.setName(name);
		if (icon != null) l.setIcon(icon);
		return l;
	}
}
