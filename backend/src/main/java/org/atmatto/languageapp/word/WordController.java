package org.atmatto.languageapp.word;

import org.atmatto.languageapp.error.ConflictException;
import org.atmatto.languageapp.error.NotFoundException;
import org.atmatto.languageapp.language.LanguageService;
import org.atmatto.languageapp.security.CurrentUser;
import org.atmatto.languageapp.sentence.SentenceService;
import org.atmatto.languageapp.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/word")
public class WordController {
	private final WordService wordService;
	private final LanguageService languageService;
	private final SentenceService sentenceService;
	// TODO: Temp?
	private final UserService userService;

	public WordController(WordService wordService, LanguageService languageService, SentenceService sentenceService, UserService userService) {
		this.wordService = wordService;
		this.languageService = languageService;
		this.sentenceService = sentenceService;
		this.userService = userService;
	}

	@PostMapping
	@Transactional
	public WordResponse create(@RequestBody WordRequest wr) {
		return new WordResponse(wordService.create(wr.toWord(null, languageService, wordService, sentenceService, CurrentUser.getOrThrow())));
	}

	@GetMapping
	public List<WordResponse> getAll() {
		return wordService.getAll().stream().map(WordResponse::new).toList();
	}

	@GetMapping("/{id}")
	public WordResponse get(@PathVariable Long id) {
		return new WordResponse(
			wordService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PutMapping("/{id}")
	@Transactional
	public WordResponse replace(@PathVariable Long id, @RequestBody WordRequest wr) {
		Word w = wordService.get(id).orElseThrow(() -> new NotFoundException("No such ID"));
		wordService.unlink(w).orElseThrow(() -> new ConflictException("Failed to unlink old associations"));
		return new WordResponse(
			wordService.replace(wr.toWord(id, languageService, wordService, sentenceService, CurrentUser.getOrThrow()))
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PatchMapping("/{id}")
	@Transactional
	public WordResponse modify(@PathVariable Long id, @RequestBody WordRequest wr) {
		return new WordResponse(
			wordService.replace(
				wordService.get(id)
					.map(w -> wr.modify(w, languageService, wordService, sentenceService, CurrentUser.getOrThrow()))
					.orElseThrow(() -> new NotFoundException("No such ID"))
			).orElseThrow(() -> new ConflictException("Failed to replace"))
		);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@Transactional
	public void delete(@PathVariable Long id) {
		wordService.delete(
			wordService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}
}
