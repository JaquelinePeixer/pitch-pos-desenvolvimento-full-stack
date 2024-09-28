package webservice.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import webservice.domains.users.User;
import webservice.domains.users.UserRole;
import webservice.entity.AuthenticationDTO;
import webservice.entity.EmptyResponse;
import webservice.entity.LoginResponseDTO;
import webservice.entity.RegisterDTO;
import webservice.enumeration.UserSituationEnum;
import webservice.infra.security.TokenService;
import webservice.repository.users.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
		var auth = this.authenticationManager.authenticate(usernamePassword);

		var user = (User) auth.getPrincipal();
		var token = tokenService.generateToken(user);

		String name = user.getName();
		UserRole userRole = user.getRole();
		int role = user.getRole().compareTo(userRole);

		return ResponseEntity.ok(new LoginResponseDTO(token, userRole, name));
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
		if (userRepository.existsByEmail(data.email())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new EmptyResponse("Usuário já cadastrado"));
		}
		
		if (this.userRepository.findByEmail(data.email()) != null) {
			return ResponseEntity.badRequest().build();
		}

		String encrytedPassword = new BCryptPasswordEncoder().encode(data.password());
		User newUser = new User(data.name(), data.birthDate(), data.email(), data.role(), data.cpf(), encrytedPassword);
		newUser.setUserSituation(UserSituationEnum.ACTIVE);
		newUser.setCreationDate(LocalDateTime.now());
		
		 // Obtendo o usuário autenticado
	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if (principal instanceof UserDetails) {
	        String username = ((UserDetails) principal).getUsername();
	        System.out.println("Usuário autenticado: " + username);
	    }

		this.userRepository.save(newUser);
		return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Usuário salvo com sucesso!"));
	}
	
}
