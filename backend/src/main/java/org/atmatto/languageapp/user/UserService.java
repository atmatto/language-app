package org.atmatto.languageapp.user;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User register(User u) {
		return userRepository.saveAndFlush(u);
	}

	public Optional<User> replace(User u) {
		try {
			return Optional.of(userRepository.saveAndFlush(u));
		} catch (OptimisticLockingFailureException e) {
			return Optional.empty();
		}
	}

	public Optional<User> get(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> get(String username) {
		return userRepository.findByUsername(username);
	}
}
