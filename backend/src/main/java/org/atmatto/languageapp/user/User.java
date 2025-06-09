package org.atmatto.languageapp.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "user_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue
	Long id;

	@NotNull
	@Size(min = 3, max = 20)
	@Column(unique = true)
	String username;

	@NotBlank
	String passwordHash;

	boolean reviewer = false;
	boolean contentAdministrator = false;
	boolean userAdministrator = false;

	public Collection<GrantedAuthority> getAuthorities() {
		ArrayList<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_ACTIVE_USER"));
		if (isReviewer()) authorities.add(new SimpleGrantedAuthority("ROLE_REVIEWER"));
		if (isContentAdministrator()) authorities.add(new SimpleGrantedAuthority("ROLE_CONTENT_ADMIN"));
		if (isUserAdministrator()) authorities.add(new SimpleGrantedAuthority("ROLE_USER_ADMIN"));
		return authorities;
	}
}
