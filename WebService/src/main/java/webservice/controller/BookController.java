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
import webservice.domains.book.Book;
import webservice.entity.EmptyResponse;
import webservice.service.BookService;

@RestController
@RequestMapping("books")
@AllArgsConstructor
@Tag(name = "Books")
public class BookController {

	private BookService bookService;

	@GetMapping("/{id}")
	public ResponseEntity<Book> getBookPorId(@PathVariable String id) {
		return bookService.getBookPorId(id);
	}

	@GetMapping
	public Page<Book> getBookAll(@RequestParam(required = false) String title,
			@RequestParam(required = false) String author, @RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "5") Integer pageSize) {
		if (title != null || author != null) {
			return bookService.getBookFilter(title, author,
					PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "title")));
		} else {
			return bookService.getBookAll(PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "title")));
		}
	}
	
	@PostMapping
	public ResponseEntity<EmptyResponse> postBook(@RequestBody Book book) {
		return bookService.postBook(book);
	}

	@PutMapping("/{id}")
	public ResponseEntity<EmptyResponse> putBook(@PathVariable String id, @RequestBody Book book) {
		return bookService.putBook(id, book);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<EmptyResponse> removeBook(@PathVariable String id) {
		return bookService.removeBook(id);
	}
}
