package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.users.SearchDao;
import webservice.domains.users.User;
import webservice.repository.users.UserRepository;
import webservice.repository.users.UserSearchDao;

@Service
@AllArgsConstructor
public class UserService {

	private UserRepository userRepository;

	private UserSearchDao userSearchDao;

	public ResponseEntity<User> getUserPorId(String id) {
		if (userRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(userRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
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

	public ResponseEntity<User> postUser(User user) {
		User userSave = userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(userSave);
	}

	public ResponseEntity<User> putUser(String id, User user) {
		if (userRepository.existsById(id)) {
			User userSave = userRepository.save(user);
			return ResponseEntity.status(HttpStatus.OK).body(userSave);
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
