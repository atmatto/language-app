package org.atmatto.languageapp.word;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class WordService {
	private final WordRepository wordRepository;

	public WordService(WordRepository wordRepository) {
		this.wordRepository = wordRepository;
	}

	public Word create(Word w) {
		return wordRepository.saveAndFlush(w);
	}

	public List<Word> getAll() {
		return wordRepository.findAll();
	}

	public Optional<Word> get(Long id) {
		return wordRepository.findById(id);
	}

	// Use before replacing if the new object has not been derived from the old object.
	public Optional<Word> unlink(Word w) {
		w.setBase(null);
		w.setForms(Set.of());
		w.setDefinitions(Set.of());
		w.setExamples(Set.of());
		return replace(w);
	}

	public Optional<Word> replace(Word w) {
		try {
			return Optional.of(wordRepository.saveAndFlush(w));
		} catch (OptimisticLockingFailureException e) {
			return Optional.empty();
		}
	}

	public void delete(Word w) {
		unlink(w); // errors are ignored
		wordRepository.delete(w);
	}
}
