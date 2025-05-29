package org.atmatto.languageapp.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public Optional<User> get(Long id) {
		return userRepository.findById(id);
	}

	// TODO: Temporary
	private User testUser;
	public User getTestUser() {
		if (testUser == null) {
			return testUser = userRepository.save(new User(null, "test-user"));
		} else {
			return testUser;
		}
	}

	// TODO
}
