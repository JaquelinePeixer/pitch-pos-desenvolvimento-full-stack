package webservice.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.users.SearchDao;
import webservice.domains.users.User;
import webservice.domains.users.UserResponse;
import webservice.entity.EmptyResponse;
import webservice.repository.users.UserRepository;
import webservice.repository.users.UserSearchDao;

@Service
@AllArgsConstructor
public class UserService {

	private UserRepository userRepository;

	private UserSearchDao userSearchDao;

	public ResponseEntity<UserResponse> getUserPorId(String id) {
		return userRepository.findById(id).map(user -> {
			UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(),
					user.getBirthDate(), user.getCpf(), user.getUserSituation(), user.getRole());

			return ResponseEntity.status(HttpStatus.OK).body(userResponse);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	public Page<User> getUserAll(PageRequest page) {
		return userRepository.findAll(page);
	}

	public Page<User> getUserFilter(String name, Boolean delayedUsers, Pageable page) {
		SearchDao request = new SearchDao();
		request.setName(name);
		request.setDelayedUsers(delayedUsers);

		return userSearchDao.findAllByCriteria(request, page);
	}

	public ResponseEntity<EmptyResponse> putUser(String id, User user) {
		if (userRepository.existsById(id)) {
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Usuário salvo com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public ResponseEntity<String> removeUser(String id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Success");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User não encontrado");
	}

}
