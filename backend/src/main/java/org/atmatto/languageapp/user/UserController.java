package org.atmatto.languageapp.user;

import org.atmatto.languageapp.error.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// TODO: Minimise the amount of information available about users to other or logged out users.
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public List<UserResponseShallow> getAll() {
		return userService.getAll().stream().map(UserResponseShallow::new).toList();
	}

	@GetMapping("/{id}")
	public UserResponseShallow get(@PathVariable Long id) {
		return new UserResponseShallow(
			userService.get(id)
				.orElseThrow(() -> new NotFoundException("No such ID"))
		);
	}
}
