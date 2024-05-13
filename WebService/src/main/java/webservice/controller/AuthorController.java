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
import webservice.entity.Author;
import webservice.service.AuthorService;

@RestController
@RequestMapping("authors")
@AllArgsConstructor
public class AuthorController {

	private AuthorService authorService;

	@GetMapping("/{id}")
	public ResponseEntity<Author> getAuthorPorId(@PathVariable Long id) {
		return authorService.getAuthorPorId(id);
	}

	@GetMapping
	public List<Author> getAuthorAll() {
		return authorService.getAuthorAll();
	}

	@PostMapping
	public ResponseEntity<Author> postAuthor(@RequestBody Author author) {
		return authorService.postAuthor(author);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Author> putAuthor(@PathVariable Long id, @RequestBody Author author) {
		return authorService.putAuthor(id, author);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeAuthor(@PathVariable Long id) {
		return authorService.removeAuthor(id);
	}

}
