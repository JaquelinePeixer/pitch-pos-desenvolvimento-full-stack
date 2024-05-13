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
import webservice.entity.Book;
import webservice.service.BookService;

@RestController
@RequestMapping("books")
@AllArgsConstructor
public class BookController {

	private BookService bookService;

	@GetMapping("/{id}")
	public ResponseEntity<Book> getBookPorId(@PathVariable Long id) {
		return bookService.getBookPorId(id);
	}

	@GetMapping
	public List<Book> getBookAll() {
		return bookService.getBookAll();
	}

	@PostMapping
	public ResponseEntity<Book> postBook(@RequestBody Book book) {
		return bookService.postBook(book);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Book> putBook(@PathVariable Long id, @RequestBody Book book) {
		return bookService.putBook(id, book);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeBook(@PathVariable Long id) {
		return bookService.removeBook(id);
	}
}
