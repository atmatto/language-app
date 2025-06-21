package org.atmatto.languageapp.word;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.atmatto.languageapp.content.Content;
import org.atmatto.languageapp.error.IllegalCycleException;
import org.atmatto.languageapp.sentence.Sentence;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Word extends Content {
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Word base = null;

	@NotNull
	@OneToMany(mappedBy = "base", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Set<Word> forms = new HashSet<>();

	@NotNull
	@ManyToMany(mappedBy = "definitionOf", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Set<Sentence> definitions = new HashSet<>();

	@NotNull
	@ManyToMany(mappedBy = "words", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Set<Sentence> examples = new HashSet<>();

	public void setBase(Word w) {
		if (w != null && Objects.equals(w.id, id)) {
			throw new IllegalCycleException("Word cannot be base for itself: " + text);
		}
		if (base != null) {
			base.forms.remove(w);
		}
		base = w;
		if (w != null) {
			w.forms.add(this);
		}
	}

	public void setForms(Set<Word> ws) {
		new HashSet<>(forms).stream()
			.filter(w -> !ws.contains(w))
			.forEach(w -> w.setBase(null));
		ws.forEach(w -> w.setBase(this));
	}

	public void addForm(Word w) {
		w.setBase(this);
	}

	public void removeForm(Word w) {
		if (forms.contains(w)) {
			w.setBase(null);
		}
	}

	public void setDefinitions(Set<Sentence> ss) {
		new HashSet<>(definitions).stream()
			.filter(s -> !ss.contains(s))
			.forEach(this::removeDefinition);
		ss.forEach(this::addDefinition);
	}

	public void addDefinition(Sentence s) {
		s.addDefinitionOf(this);
	}

	public void removeDefinition(Sentence s) {
		s.removeDefinitionOf(this);
	}

	public void setExamples(Set<Sentence> ss) {
		new HashSet<>(examples).stream()
			.filter(s -> !ss.contains(s))
			.forEach(this::removeExample);
		ss.forEach(this::addExample);
	}

	public void addExample(Sentence s) {
		s.addWord(this);
	}

	public void removeExample(Sentence s) {
		s.removeWord(this);
	}
}
