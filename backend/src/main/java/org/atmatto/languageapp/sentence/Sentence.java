package org.atmatto.languageapp.sentence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.atmatto.languageapp.content.Content;
import org.atmatto.languageapp.word.Word;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
public class Sentence extends Content {
	@NotNull
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinTable(name = "sentence_words")
	private Set<Word> words = new HashSet<>();

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Word focus = null;

	@NotNull
	@ManyToMany(/*mappedBy = "translations", */ fetch = FetchType.LAZY, cascade = CascadeType.MERGE) // TODO ??
	@JoinTable(name = "sentence_translations")
	private Set<Sentence> translations = new HashSet<>();

	@NotNull
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinTable(name = "word_definitions")
	private Set<Word> definitionOf = new HashSet<>();

	@NotNull
	private String attribution = "";

	public void setWords(Set<Word> ws) {
		new HashSet<>(words).stream()
			.filter(w -> !ws.contains(w))
			.forEach(this::removeWord);
		ws.forEach(this::addWord);
	}

	public void addWord(Word w) {
		words.add(w);
		w.getExamples().add(this);
	}

	public void removeWord(Word w) {
		words.remove(w);
		w.getExamples().remove(this);
		if (Objects.equals(focus.getId(), w.getId())) {
			focus = null;
		}
	}

	public void setFocus(Word w) {
		focus = w;
		if (w != null) {
			addWord(w);
		}
	}

	public void setTranslations(Set<Sentence> ss) {
		new HashSet<>(translations).stream()
			.filter(s -> !ss.contains(s))
			.forEach(this::removeTranslation);
		ss.forEach(this::addTranslation);
	}

	public void addTranslation(Sentence s) {
		translations.add(s);
		s.translations.add(this);
	}

	public void removeTranslation(Sentence s) {
		translations.remove(s);
		s.translations.remove(this);
	}

	public void setDefinitionOf(Set<Word> ws) {
		new HashSet<>(definitionOf).stream()
			.filter(w -> !ws.contains(w))
			.forEach(this::removeDefinitionOf);
		ws.forEach(this::addDefinitionOf);
	}

	public void addDefinitionOf(Word w) {
		definitionOf.add(w);
		w.getDefinitions().add(this);
	}

	public void removeDefinitionOf(Word w) {
		definitionOf.remove(w);
		w.getDefinitions().remove(this);
	}
}
