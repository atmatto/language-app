package org.atmatto.languageapp.word;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.atmatto.languageapp.content.ContentResponse;
import org.atmatto.languageapp.sentence.SentenceResponseShallow;

import java.util.Set;
import java.util.stream.Collectors;

public record WordResponse(
	@JsonUnwrapped ContentResponse contentResponse,
	WordResponseShallow base,
	Set<WordResponseShallow> forms,
	Set<SentenceResponseShallow> definitions,
	Set<SentenceResponseShallow> examples
) {
	public WordResponse(Word w) {
		this(
			new ContentResponse(w),
			w.getBase() == null ? null : new WordResponseShallow(w.getBase()),
			w.getForms().stream().map(WordResponseShallow::new).collect(Collectors.toSet()),
			w.getDefinitions().stream().map(SentenceResponseShallow::new).collect(Collectors.toSet()),
			w.getExamples().stream().map(SentenceResponseShallow::new).collect(Collectors.toSet())
		);
	}
}
