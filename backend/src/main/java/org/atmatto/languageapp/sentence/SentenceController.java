package org.atmatto.languageapp.sentence;

import org.atmatto.languageapp.error.ConflictException;
import org.atmatto.languageapp.error.NotFoundException;
import org.atmatto.languageapp.language.LanguageService;
import org.atmatto.languageapp.security.CurrentUser;
import org.atmatto.languageapp.word.WordService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sentence")
public class SentenceController {
	private final WordService wordService;
	private final LanguageService languageService;
	private final SentenceService sentenceService;

	public SentenceController(WordService wordService, LanguageService languageService, SentenceService sentenceService) {
		this.wordService = wordService;
		this.languageService = languageService;
		this.sentenceService = sentenceService;
	}

	@PostMapping
	@Transactional
	public SentenceResponse create(@RequestBody SentenceRequest sr) {
		return new SentenceResponse(sentenceService.create(sr.toSentence(null, languageService, wordService, sentenceService, CurrentUser.getOrThrow())));
	}

	@GetMapping
	public List<SentenceResponse> getAll() {
		return sentenceService.getAll().stream().map(SentenceResponse::new).toList();
	}

	@GetMapping("/{id}")
	public SentenceResponse get(@PathVariable Long id) {
		return new SentenceResponse(
			sentenceService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PutMapping("/{id}")
	@Transactional
	public SentenceResponse replace(@PathVariable Long id, @RequestBody SentenceRequest sr) {
		Sentence s = sentenceService.get(id).orElseThrow(() -> new NotFoundException("No such ID"));
		sentenceService.unlink(s).orElseThrow(() -> new ConflictException("Failed to unlink old associations"));
		return new SentenceResponse(
			sentenceService.replace(sr.toSentence(id, languageService, wordService, sentenceService, CurrentUser.getOrThrow()))
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PatchMapping("/{id}")
	@Transactional
	public SentenceResponse modify(@PathVariable Long id, @RequestBody SentenceRequest sr) {
		return new SentenceResponse(
			sentenceService.replace(
				sentenceService.get(id)
					.map(s -> sr.modify(s, languageService, wordService, sentenceService, CurrentUser.getOrThrow()))
					.orElseThrow(() -> new NotFoundException("No such ID"))
			).orElseThrow(() -> new ConflictException("Failed to replace"))
		);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@Transactional
	public void delete(@PathVariable Long id) {
		sentenceService.delete(
			sentenceService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}
}
