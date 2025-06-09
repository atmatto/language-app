package org.atmatto.languageapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.atmatto.languageapp.user.User;
import org.atmatto.languageapp.user.UserService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.NoSuchElementException;

public class JwtFilter extends OncePerRequestFilter {
	private final JwtProvider jwtProvider;
	private final UserService userService;

	public JwtFilter(JwtProvider jwtProvider, UserService userService) {
		this.jwtProvider = jwtProvider;
		this.userService = userService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authentication");
		if (header != null && header.startsWith("Bearer ")) {
			try {
				String token = header.substring(7);
				Claims claims = jwtProvider.parse(token);
				long userId = Long.parseLong(claims.getSubject());
				User user = userService.get(userId).orElseThrow();
				UsernamePasswordAuthenticationToken auth = UsernamePasswordAuthenticationToken.authenticated(user, null, user.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(auth);
			} catch (JwtException | NumberFormatException | NoSuchElementException e) {
				// Ignore – if re-authentication is needed, the request will fail later anyway.
				// If not, then there is no reason to fail now.
			}
		}
		filterChain.doFilter(request, response);
	}
}
