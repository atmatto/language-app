package org.atmatto.languageapp.sentence;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SentenceService {
	private final SentenceRepository sentenceRepository;

	public SentenceService(SentenceRepository sentenceRepository) {
		this.sentenceRepository = sentenceRepository;
	}

	public Sentence create(Sentence s) {
		return sentenceRepository.saveAndFlush(s);
	}

	public List<Sentence> getAll() {
		return sentenceRepository.findAll();
	}

	public Optional<Sentence> get(Long id) {
		return sentenceRepository.findById(id);
	}

	// Use before replacing if the new object has not been derived from the old object.
	public Optional<Sentence> unlink(Sentence s) {
		s.setWords(Set.of());
		s.setFocus(null);
		s.setTranslations(Set.of());
		s.setDefinitionOf(Set.of());
		return replace(s);
	}

	public Optional<Sentence> replace(Sentence s) {
		try {
			return Optional.of(sentenceRepository.saveAndFlush(s));
		} catch (OptimisticLockingFailureException e) {
			return Optional.empty();
		}
	}

	public void delete(Sentence s) {
		unlink(s);
		sentenceRepository.delete(s);
	}
}
