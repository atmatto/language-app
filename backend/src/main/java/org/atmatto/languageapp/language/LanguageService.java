package org.atmatto.languageapp.language;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {
	private final LanguageRepository languageRepository;

	public LanguageService(LanguageRepository languageRepository) {
		this.languageRepository = languageRepository;
	}

	public Language create(Language l) {
		return languageRepository.saveAndFlush(l);
	}

	public List<Language> getAll() {
		return languageRepository.findAll();
	}

	public Optional<Language> get(Long id) {
		return languageRepository.findById(id);
	}

	public Optional<Language> replace(Language l) {
		try {
			return Optional.of(languageRepository.saveAndFlush(l));
		} catch (OptimisticLockingFailureException e) {
			return Optional.empty();
		}
	}

	public void delete(Language l) {
		languageRepository.delete(l);
	}
}
