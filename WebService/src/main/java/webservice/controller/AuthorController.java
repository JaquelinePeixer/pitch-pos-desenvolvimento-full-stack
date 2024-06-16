package webservice.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import webservice.entity.Author;
import webservice.service.AuthorService;

@RestController
@RequestMapping("authors")
@AllArgsConstructor
@Tag(name = "Authors")
public class AuthorController {

	private AuthorService authorService;

	@GetMapping("/{id}")
	public ResponseEntity<Author> getAuthorPorId(@PathVariable Long id) {
		return authorService.getAuthorPorId(id);
	}

	@GetMapping
	public Page<Author> getAuthorAll(
			@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "5") Integer itensPerPage) {
		return authorService.getAuthorAll(PageRequest.of(page, itensPerPage));
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
