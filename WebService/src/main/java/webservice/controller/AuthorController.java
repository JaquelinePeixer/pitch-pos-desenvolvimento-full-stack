package webservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
import webservice.entity.ResponseModel;
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
	public Page<Author> getAuthorAll(@RequestParam(required = false) String name,
			@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "5") Integer pageSize) {
		if (name != null) {
			return authorService.authorFilter(name,
					PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "name")));
		} else {
			return authorService.getAuthorAll(PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "name")));
		}
	}

	@PostMapping
	public ResponseEntity<Author> postAuthor(@RequestBody Author author) {
		return authorService.postAuthor(author);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ResponseModel> putAuthor(@PathVariable Long id, @RequestBody Author author) {
		return authorService.putAuthor(id, author);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseModel> removeAuthor(@PathVariable Long id) {
		return authorService.removeAuthor(id);
	}

}
