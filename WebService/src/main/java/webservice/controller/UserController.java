package webservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import webservice.domains.bookloan.BookLoanDTO;
import webservice.domains.users.User;
import webservice.domains.users.UserResponse;
import webservice.entity.EmptyResponse;
import webservice.service.UserService;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@Tag(name = "Users")
public class UserController {

	private UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getUserPorId(@PathVariable String id) {
		return userService.getUserPorId(id);
	}

	@GetMapping
	public Page<UserResponse> getUserAll(@RequestParam(required = false) String name,
			@RequestParam(required = false) Boolean delayedUsers, @RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "5") Integer pageSize) {
		if (name != null || delayedUsers != null) {
			return userService.getUserFilter(name, delayedUsers,
					PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "name")));
		} else {
			return userService.getUserAll(PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "name")));
		}
	}

	@GetMapping("/cpf/{cpf}")
	public ResponseEntity<UserResponse> getUserPorCpf(@PathVariable String cpf) {
		return userService.getUserPorCpf(cpf);
	}

	@GetMapping("/getByToken")
	public ResponseEntity<UserResponse> getUserByToken() {
		return userService.getUserByToken();
	}

	@PutMapping("/{id}")
	public ResponseEntity<EmptyResponse> putUser(@PathVariable String id, @RequestBody User user) {
		return userService.putUser(id, user);
	}
	
	@PutMapping("/edit-user/{id}")
	public ResponseEntity<EmptyResponse> putEditUser(@PathVariable String id, @RequestBody User user) {
		return userService.putEditUser(id, user);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<EmptyResponse> removeUser(@PathVariable String id) {
		return userService.removeUser(id);
	}

	@GetMapping("/user-bookloan")
	public Page<BookLoanDTO> getUserBookLoan(Pageable pageable) {
		return userService.getUserBookLoan(pageable);
	}
}
