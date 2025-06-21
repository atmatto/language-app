package org.atmatto.languageapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.atmatto.languageapp.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {
	private final long expirationMinutes;
	private final SecretKey secretKey;
	private final JwtParser parser;

	public JwtProvider(Environment env) {
		expirationMinutes = Long.parseLong(env.getRequiredProperty("org.atmatto.languageapp.jwtExpirationMinutes"));
		String secretString = env.getRequiredProperty("org.atmatto.languageapp.jwtSecret");
		byte[] keyBytes = Base64.getDecoder().decode(secretString);
		secretKey = Keys.hmacShaKeyFor(keyBytes);
		parser = Jwts.parser().verifyWith(secretKey).build();
	}

	public Claims parse(String token) {
		return parser.parseSignedClaims(token).getPayload(); // TODO: Check alg=none
	}

	public String create(User user) {
		return Jwts.builder()
			.subject(user.getId().toString())
			.issuedAt(new Date())
			.expiration(Date.from(Instant.now().plusSeconds(expirationMinutes * 60)))
			.signWith(secretKey)
			.compact();
	}
}
