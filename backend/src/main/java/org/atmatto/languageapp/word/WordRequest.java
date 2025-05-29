package org.atmatto.languageapp.word;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Getter;
import org.atmatto.languageapp.content.ContentRequest;
import org.atmatto.languageapp.error.NotFoundException;
import org.atmatto.languageapp.language.LanguageService;
import org.atmatto.languageapp.sentence.SentenceService;
import org.atmatto.languageapp.user.User;

import java.util.Set;
import java.util.stream.Collectors;

public record WordRequest(
	@JsonUnwrapped ContentRequest contentRequest,
	Long base,
	Set<Long> forms,
	Set<Long> definitions,
	Set<Long> examples
) {
	public Word toWord(Long id, LanguageService languageService, WordService wordService, SentenceService sentenceService, User user) {
		Word w = new Word();
		w.setId(id);
		return modify(w, languageService, wordService, sentenceService, user);
	}

	public Word modify(Word w, LanguageService languageService, WordService wordService, SentenceService sentenceService, User user) {
		if (contentRequest != null) contentRequest.modify(w, languageService, user);
		if (base != null) w.setBase(wordService.get(base)
			.orElseThrow(() -> new NotFoundException("No such Word ID: " + base)));
		if (forms != null) w.setForms(forms.stream()
			.map(wid -> wordService.get(wid)
				.orElseThrow(() -> new NotFoundException("No such Word ID: " + wid)))
			.collect(Collectors.toSet()));
		if (definitions != null) w.setDefinitions(definitions.stream()
			.map(sid -> sentenceService.get(sid)
				.orElseThrow(() -> new NotFoundException("No such Sentence ID: " + sid)))
			.collect(Collectors.toSet()));
		if (examples != null) w.setExamples(examples.stream()
			.map(sid -> sentenceService.get(sid)
				.orElseThrow(() -> new NotFoundException("No such Sentence ID: " + sid)))
			.collect(Collectors.toSet()));
		return w;
	}
}
