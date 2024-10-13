package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.bookloan.BookLoanDTO;
import webservice.domains.users.SearchDao;
import webservice.domains.users.User;
import webservice.domains.users.UserResponse;
import webservice.entity.EmptyResponse;
import webservice.repository.BookLoanRepository;
import webservice.repository.users.UserRepository;
import webservice.repository.users.UserSearchDao;

@Service
@AllArgsConstructor
public class UserService {

	private UserRepository userRepository;

	private UserSearchDao userSearchDao;

	private BookLoanRepository bookLoanRepository;

	public ResponseEntity<UserResponse> getUserPorId(String id) {
		return userRepository.findById(id).map(user -> {
			UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(),
					user.getBirthDate(), user.getCpf(), user.getUserSituation(), user.getRole());

			return ResponseEntity.status(HttpStatus.OK).body(userResponse);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	public ResponseEntity<UserResponse> getUserPorCpf(String cpf) {
		return userRepository.findByCpf(cpf).map(user -> {
			UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(),
					user.getBirthDate(), user.getCpf(), user.getUserSituation(), user.getRole());

			return ResponseEntity.status(HttpStatus.OK).body(userResponse);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	public Page<UserResponse> getUserAll(PageRequest page) {

		return userRepository.findAll(page).map(user -> {
			UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(),
					user.getBirthDate(), user.getCpf(), user.getUserSituation(), user.getRole());

			return userResponse;
		});
	}

	public Page<UserResponse> getUserFilter(String name, Boolean delayedUsers, Pageable page) {
		SearchDao request = new SearchDao();
		request.setName(name);
		request.setDelayedUsers(delayedUsers);

		return userSearchDao.findAllByCriteria(request, page).map(user -> {
			UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(),
					user.getBirthDate(), user.getCpf(), user.getUserSituation(), user.getRole());

			return userResponse;
		});
	}

	public ResponseEntity<EmptyResponse> putUser(String id, User user) {
		if (userRepository.existsById(id)) {
			String encrytedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
			user.setPassword(encrytedPassword);
			User userSave = userRepository.save(user);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Usuário salvo com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Usuário não encontrado"));
	}

	public ResponseEntity<EmptyResponse> removeUser(String id) {
		if (userRepository.existsById(id)) {

			// Obtém o usuário autenticado
			UserDetails authenticatedUser = getAuthenticatedUser();
			if (authenticatedUser == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
						.body(new EmptyResponse("Usuário não autenticado"));
			}

			User userAuth = (User) userRepository.findByEmail(authenticatedUser.getUsername());
			if (userAuth == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
						.body(new EmptyResponse("Usuário não autenticado"));
			}

			if (userAuth.getId().equals(id)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}

			userRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Usuário removido com sucesso!"));

		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Usuário não encontrado"));
	}

	public UserDetails getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
			throw new IllegalStateException("Usuário não está autenticado.");
		}

		return (UserDetails) authentication.getPrincipal();
	}

	public Page<BookLoanDTO> getUserBookLoan(Pageable pageable) {
		UserDetails authenticatedUser = getAuthenticatedUser();
		if (authenticatedUser == null) {
			return Page.empty();
		}

		User userAuth = (User) userRepository.findByEmail(authenticatedUser.getUsername());
		if (userAuth == null) {
			return Page.empty();
		}
		return bookLoanRepository.findByUser(userAuth, pageable)
				.map(bookLoan -> new BookLoanDTO(bookLoan.getBook().getTitle(), bookLoan.getLoanDate(),
						bookLoan.getReturnDate()));

	}

	public ResponseEntity<UserResponse> getUserByToken() {
		UserDetails authenticatedUser = getAuthenticatedUser();
		if (authenticatedUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		User userAuth = (User) userRepository.findByEmail(authenticatedUser.getUsername());
		if (userAuth == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		UserResponse newUserResponse = new UserResponse(userAuth.getId(), userAuth.getName(), userAuth.getEmail(),
				userAuth.getBirthDate(), userAuth.getCpf(), userAuth.getUserSituation(), userAuth.getRole());

		return ResponseEntity.status(HttpStatus.OK).body(newUserResponse);
	}

}
