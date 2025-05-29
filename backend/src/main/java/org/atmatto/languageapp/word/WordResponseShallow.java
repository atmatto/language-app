package org.atmatto.languageapp.word;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.atmatto.languageapp.content.ContentResponse;
import org.atmatto.languageapp.sentence.Sentence;

import java.util.Set;
import java.util.stream.Collectors;

public record WordResponseShallow(
	@JsonUnwrapped ContentResponse contentResponse,
	Long base,
	Set<Long> forms,
	Set<Long> definitions,
	Set<Long> examples
) {
	public WordResponseShallow(Word w) {
		this(
			new ContentResponse(w),
			w.getBase() == null ? null : w.getBase().getId(),
			w.getForms().stream().map(Word::getId).collect(Collectors.toSet()),
			w.getDefinitions().stream().map(Sentence::getId).collect(Collectors.toSet()),
			w.getExamples().stream().map(Sentence::getId).collect(Collectors.toSet())
		);
	}
}
