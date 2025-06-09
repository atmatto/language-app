package org.atmatto.languageapp.language;

import org.atmatto.languageapp.error.ConflictException;
import org.atmatto.languageapp.error.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/language")
public class LanguageController {
	private final LanguageService languageService;

	public LanguageController(LanguageService languageService) {
		this.languageService = languageService;
	}

	@PostMapping
	@PreAuthorize("hasRole('CONTENT_ADMIN')")
	public LanguageResponse create(@RequestBody LanguageRequest lr) {
		return new LanguageResponse(languageService.create(lr.toLanguage(null)));
	}

	@GetMapping
	public List<LanguageResponse> getAll() {
		return languageService.getAll().stream().map(LanguageResponse::new).toList();
	}

	@GetMapping("/{id}")
	public LanguageResponse get(@PathVariable Long id) {
		return new LanguageResponse(
			languageService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('CONTENT_ADMIN')")
	public LanguageResponse replace(@PathVariable Long id, @RequestBody LanguageRequest lr) {
		return new LanguageResponse(
			languageService.replace(lr.toLanguage(id))
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}

	@PatchMapping("/{id}")
	@PreAuthorize("hasRole('CONTENT_ADMIN')")
	public LanguageResponse modify(@PathVariable Long id, @RequestBody LanguageRequest lr) {
		return new LanguageResponse(
			languageService.replace(
				languageService.get(id)
					.map(lr::modify)
					.orElseThrow(() -> new NotFoundException("No such ID"))
			).orElseThrow(() -> new ConflictException("Failed to replace"))
		);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('CONTENT_ADMIN')")
	public void delete(@PathVariable Long id) {
		languageService.delete(
			languageService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}
}
