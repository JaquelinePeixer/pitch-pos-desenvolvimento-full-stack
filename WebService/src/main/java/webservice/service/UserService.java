package webservice.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.User;
import webservice.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService {

	private UserRepository userRepository;

	public ResponseEntity<User> getUserPorId(Long id) {
		if (userRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(userRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public List<User> getUserAll() {
		return userRepository.findAll();
	}

	public ResponseEntity<User> postUser(User user) {
		User userSave = userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(userSave);
	}

	public ResponseEntity<User> putUser(Long id, User user) {
		if (userRepository.existsById(id)) {
			User userSave = userRepository.save(user);
			return ResponseEntity.status(HttpStatus.OK).body(userSave);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public ResponseEntity<String> removeUser(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Success");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User não encontrado");
	}
}
