package webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import webservice.entity.AuthenticationDTO;
import webservice.entity.LoginResponseDTO;
import webservice.entity.RegisterDTO;
import webservice.entity.User;
import webservice.entity.UserRole;
import webservice.infra.security.TokenService;
import webservice.repository.UserRepository;

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
		
		String name = user.getUsername();
		UserRole userRole = user.getRole();
		int role = user.getRole().compareTo(userRole);
				
		return ResponseEntity.ok(new LoginResponseDTO(token, role, name));
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
		if (this.userRepository.findByEmail(data.email()) != null)
			return ResponseEntity.badRequest().build();

		String encrytedPassword = new BCryptPasswordEncoder().encode(data.password());
		User newUser = new User(data.email(), encrytedPassword, data.role());

		this.userRepository.save(newUser);
		return ResponseEntity.ok().build();
	}

}
