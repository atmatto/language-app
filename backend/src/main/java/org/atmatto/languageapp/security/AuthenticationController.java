package org.atmatto.languageapp.security;

import jakarta.validation.Valid;
import org.atmatto.languageapp.error.AuthenticationException;
import org.atmatto.languageapp.error.ConflictException;
import org.atmatto.languageapp.user.User;
import org.atmatto.languageapp.user.UserResponseShallow;
import org.atmatto.languageapp.user.UserService;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;
	private final Authenticator authenticator;

	public AuthenticationController(UserService userService, PasswordEncoder passwordEncoder,
									JwtProvider jwtProvider, Authenticator authenticator) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.authenticator = authenticator;
	}

	@PostMapping("/session")
	public ResponseEntity<SignInResponse> signIn(@RequestBody @Valid SignInRequest sr) {
		User u = authenticator.authenticate(sr.username(), sr.password()).orElseThrow(() -> new AuthenticationException("Wrong username or password"));
		return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(new SignInResponse(jwtProvider.create(u), new UserResponseShallow(u)));
	}

	@PostMapping("/session/extend")
	public ResponseEntity<SignInResponse> extendSession() {
		User u = CurrentUser.getOrThrow();
		return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(new SignInResponse(jwtProvider.create(u), new UserResponseShallow(u)));
	}

	@PostMapping("/account")
	public ResponseEntity<UserResponseShallow> register(@RequestBody @Valid RegisterRequest rr) {
		User u = userService.register(rr.toUser(passwordEncoder));
		return ResponseEntity.ok(new UserResponseShallow(u));
	}

	// TODO: Invalidate all previous sessions
	@PutMapping("/account/password")
	public ResponseEntity<UserResponseShallow> changePassword(@RequestBody @Valid PasswordChangeRequest pcr) {
		User u = CurrentUser.getOrThrow();
		if (authenticator.authenticate(u, pcr.oldPassword())) {
			u.setPasswordHash(passwordEncoder.encode(pcr.newPassword()));
			userService.replace(u).orElseThrow(() -> new ConflictException("Failed to change password"));
		} else {
			throw new AuthenticationException("Wrong old password");
		}
		return ResponseEntity.ok(new UserResponseShallow(u));
	}
}
