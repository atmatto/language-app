package org.atmatto.languageapp.sentence;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.atmatto.languageapp.content.ContentResponse;
import org.atmatto.languageapp.word.WordResponse;
import org.atmatto.languageapp.word.WordResponseShallow;

import java.util.Set;
import java.util.stream.Collectors;

public record SentenceResponse(
	@JsonUnwrapped ContentResponse contentResponse,
	Set<WordResponseShallow> words,
	WordResponseShallow focus,
	Set<SentenceResponseShallow> translations,
	Set<WordResponseShallow> definitionOf,
	String attribution
) {
	public SentenceResponse(Sentence s) {
		this(
			new ContentResponse(s),
			s.getWords().stream().map(WordResponseShallow::new).collect(Collectors.toSet()),
			s.getFocus() == null ? null : new WordResponseShallow(s.getFocus()), // TODO: use Optional to make this and similar cases nicer?
			s.getTranslations().stream().map(SentenceResponseShallow::new).collect(Collectors.toSet()),
			s.getDefinitionOf().stream().map(WordResponseShallow::new).collect(Collectors.toSet()),
			s.getAttribution()
		);
	}
}
