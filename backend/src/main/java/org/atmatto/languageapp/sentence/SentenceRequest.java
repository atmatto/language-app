package org.atmatto.languageapp.sentence;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.atmatto.languageapp.content.ContentRequest;
import org.atmatto.languageapp.error.NotFoundException;
import org.atmatto.languageapp.language.LanguageService;
import org.atmatto.languageapp.user.User;
import org.atmatto.languageapp.word.WordService;

import java.util.Set;
import java.util.stream.Collectors;

public record SentenceRequest(
	@JsonUnwrapped ContentRequest contentRequest,
	Set<Long> words,
	Long focus,
	Set<Long> translations,
	Set<Long> definitionOf,
	String attribution
) {
	public Sentence toSentence(Long id, LanguageService languageService, WordService wordService, SentenceService sentenceService, User user) {
		Sentence s = new Sentence();
		s.setId(id);
		return modify(s, languageService, wordService, sentenceService, user);
	}

	public Sentence modify(Sentence s, LanguageService languageService, WordService wordService, SentenceService sentenceService, User user) {
		if (contentRequest != null) contentRequest.modify(s, languageService, user);
		if (words != null) s.setWords(words.stream()
			.map(wid -> wordService.get(wid)
				.orElseThrow(() -> new NotFoundException("No such Word ID: " + wid)))
			.collect(Collectors.toSet()));
		if (focus != null) s.setFocus(wordService.get(focus)
			.orElseThrow(() -> new NotFoundException("No such Word ID: " + focus)));
		if (translations != null) s.setTranslations(translations.stream()
			.map(sid -> sentenceService.get(sid)
				.orElseThrow(() -> new NotFoundException("No such Sentence ID: " + sid)))
			.collect(Collectors.toSet()));
		if (definitionOf != null) s.setDefinitionOf(definitionOf.stream()
			.map(wid -> wordService.get(wid)
				.orElseThrow(() -> new NotFoundException("No such Word ID: " + wid)))
			.collect(Collectors.toSet()));
		if (attribution != null) s.setAttribution(attribution);
		return s;
	}
}
