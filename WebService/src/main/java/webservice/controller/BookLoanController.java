package webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import webservice.domains.bookloan.BookLoan;
import webservice.entity.EmptyResponse;
import webservice.service.BookLoanService;

@RestController
@RequestMapping("books-loan")
@AllArgsConstructor
@Tag(name = "Books Loan")
public class BookLoanController {

	@Autowired
	private BookLoanService bookLoanService;

	@PostMapping("/emprestimo")
	public ResponseEntity<EmptyResponse> postBookLoan(@RequestBody BookLoan book) {
		return bookLoanService.postBookLoan(book);
	}

	@PostMapping("/devolucao")
	public ResponseEntity<EmptyResponse> removeBookLoan(@RequestBody BookLoan book) {
		return bookLoanService.removeBookLoan(book);
	}

}
