package webservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import webservice.entity.User;
import webservice.service.UserService;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {

	private UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserPorId(@PathVariable Long id) {
		return userService.getUserPorId(id);
	}

	@GetMapping
	public List<User> getUserAll() {
		return userService.getUserAll();
	}

	@PostMapping
	public ResponseEntity<User> postUser(@RequestBody User user) {
		return userService.postUser(user);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> putUser(@PathVariable Long id, @RequestBody User user) {
		return userService.putUser(user);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeUser(@PathVariable Long id) {
		return userService.removeUser(id);
	}
}
