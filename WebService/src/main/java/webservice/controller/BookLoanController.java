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
import webservice.domains.book.BookLoan;
import webservice.service.BookLoanService;


@RestController
@RequestMapping("books-loan")
@AllArgsConstructor
@Tag(name = "Books Loan")
public class BookLoanController {
	
	private BookLoanService bookLoanService;

	@GetMapping("/{id}")
	public ResponseEntity<BookLoan> getBookPorId(@PathVariable String id) {
		return bookLoanService.getBookPorId(id);
	}

	@GetMapping
	public Page<BookLoan> getBookAll(@RequestParam(required = false) String title,
			@RequestParam(required = false) String author_id, @RequestParam(required = false) String id,
			@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer pageSize) {
		if (title != null || author_id != null || id != null) {
			return bookLoanService.bookFilter(title, author_id, id,
					PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "title")));
		} else {
			return bookLoanService.getBookAll(PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "title")));
		}
	}

	@PostMapping
	public ResponseEntity<BookLoan> postBook(@RequestBody BookLoan book) {
		return bookLoanService.postBook(book);
	}

	@PutMapping("/{id}")
	public ResponseEntity<BookLoan> putBook(@PathVariable String id, @RequestBody BookLoan book) {
		return bookLoanService.putBook(id, book);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeBook(@PathVariable String id) {
		return bookLoanService.removeBook(id);
	}
}
