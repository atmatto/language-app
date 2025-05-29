package org.atmatto.languageapp.content;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.atmatto.languageapp.history.HistoryProperty;
import org.atmatto.languageapp.language.Language;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
public abstract class Content {
	@Id
	@GeneratedValue
	protected Long id;

	@NotNull
	@ManyToOne
	protected Language language;

	@NotBlank
	protected String text;

	@NotNull
	protected String note = "";

	@NotNull
	protected Provenance provenance;

	@NotNull
	protected Boolean ignored = false;

	@NotNull
	@Embedded
	protected HistoryProperty created;

	@NotNull
	@Embedded
	protected HistoryProperty modified;

	@Embedded
	protected HistoryProperty reviewed;
}
