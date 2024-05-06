package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import service.UserService;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {

	private UserService userService;
	
	
}
