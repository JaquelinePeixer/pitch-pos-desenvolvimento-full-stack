package webservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import webservice.entity.User;

@Service
public class UserService {

	private static Map<Long, User> userList = new HashMap<>();

	public ResponseEntity<User> getUserPorId(Long id) {
		User user = userList.get(id);

		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	public List<User> getUserAll() {
		return new ArrayList<>(userList.values());
	}

	public ResponseEntity<User> postUser(User user) {
		userList.put(user.getId(), user);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	public ResponseEntity<User> putUser(User User) {
		User foundUser = userList.get(User.getId());

		if (foundUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		userList.put(User.getId(), User);
		return ResponseEntity.status(HttpStatus.OK).body(foundUser);
	}

	public ResponseEntity<String> removeUser(Long id) {
		User foundUser = userList.get(id);

		if (foundUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		userList.remove(id);
		return ResponseEntity.status(HttpStatus.OK).body("User deletado com sucesso!");
	}
}
