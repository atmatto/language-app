package org.atmatto.languageapp.security;

import jakarta.servlet.DispatcherType;
import org.atmatto.languageapp.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
	private final JwtProvider jwtProvider;
	private final UserService userService;

	public SecurityConfiguration(JwtProvider jwtProvider, UserService userService) {
		this.jwtProvider = jwtProvider;
		this.userService = userService;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return username -> { throw new UsernameNotFoundException("UserDetailsService is not used"); };
	}

	@Bean
	public JwtFilter jwtAuthenticationFilter() {
		return new JwtFilter(jwtProvider, userService);
	}

	@Bean
	public UrlBasedCorsConfigurationSource corsConfiguration() {
		CorsConfiguration c = new CorsConfiguration();
		c.setAllowedOrigins(List.of("http://localhost:4200"));
		c.addAllowedMethod(CorsConfiguration.ALL);
		c.addAllowedHeader(CorsConfiguration.ALL);
		UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
		src.registerCorsConfiguration("/**", c);
		return src;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(requests -> requests
				.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
				.requestMatchers("/api/v1/auth/**").permitAll()
				.requestMatchers(HttpMethod.POST).hasRole("ACTIVE_USER")
				.requestMatchers(HttpMethod.PUT).hasRole("ACTIVE_USER")
				.requestMatchers(HttpMethod.PATCH).hasRole("ACTIVE_USER")
				.requestMatchers(HttpMethod.DELETE).hasRole("ACTIVE_USER")
				.anyRequest().permitAll())
			.cors(cors -> cors.configurationSource(corsConfiguration()))
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.formLogin(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable)
			.logout(AbstractHttpConfigurer::disable)
			.anonymous(AbstractHttpConfigurer::disable)
			.oneTimeTokenLogin(AbstractHttpConfigurer::disable)
			.passwordManagement(AbstractHttpConfigurer::disable)
			.rememberMe(AbstractHttpConfigurer::disable)
			.requestCache(AbstractHttpConfigurer::disable)
			.anonymous(AbstractHttpConfigurer::disable);
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}

