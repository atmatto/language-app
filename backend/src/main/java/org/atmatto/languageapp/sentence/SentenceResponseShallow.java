package org.atmatto.languageapp.sentence;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.atmatto.languageapp.content.ContentResponse;
import org.atmatto.languageapp.word.Word;
import org.atmatto.languageapp.word.WordResponseShallow;

import java.util.Set;
import java.util.stream.Collectors;

public record SentenceResponseShallow(
	@JsonUnwrapped ContentResponse contentResponse,
	Set<Long> words,
	Long focus,
	Set<Long> translations,
	Set<Long> definitionOf,
	String attribution
) {
	public SentenceResponseShallow(Sentence s) {
		this(
			new ContentResponse(s),
			s.getWords().stream().map(Word::getId).collect(Collectors.toSet()),
			s.getFocus() == null ? null : s.getFocus().getId(),
			s.getTranslations().stream().map(Sentence::getId).collect(Collectors.toSet()),
			s.getDefinitionOf().stream().map(Word::getId).collect(Collectors.toSet()),
			s.getAttribution()
		);
	}
}
