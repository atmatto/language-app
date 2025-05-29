package org.atmatto.languageapp.history;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.atmatto.languageapp.user.User;

import java.time.Instant;

@Embeddable // TODO: remove comment? @Embeddable would be better but then handling multiple HistoryProperty objects in the same entity is difficult
@Getter
@Setter
public class HistoryProperty {
//	@Id
//	@GeneratedValue
//	Long id;

	@ManyToOne
	@NotNull
	private User user;

	@NotNull
	private Instant timestamp;

	protected HistoryProperty() {}

	public HistoryProperty(User user) {
		this.user = user;
		this.timestamp = Instant.now();
	}
}
