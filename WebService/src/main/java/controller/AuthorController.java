package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import service.AuthorService;

@RestController
@RequestMapping("authors")
@AllArgsConstructor
public class AuthorController {
	
	private AuthorService authorService;

}
