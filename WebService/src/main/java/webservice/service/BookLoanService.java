package webservice.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.book.Book;
import webservice.domains.bookloan.BookLoan;
import webservice.domains.users.User;
import webservice.entity.EmptyResponse;
import webservice.repository.BookLoanRepository;
import webservice.repository.BookRepository;
import webservice.repository.users.UserRepository;

@AllArgsConstructor
@Service
public class BookLoanService {

	private BookRepository bookRepository;

	private BookLoanRepository bookLoanRepository;

	private UserRepository userRepository;

	public ResponseEntity<EmptyResponse> postBookLoan(BookLoan bookLoan) {
		Optional<User> user = userRepository.findByCpf(bookLoan.getUser().getCpf());
		if (!user.isPresent()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new EmptyResponse("Erro ao buscar usuário"));
		}
		Optional<Book> book = bookRepository.findById(bookLoan.getBook().getId());

		bookLoan.setUser(user.get());
		bookLoan.setBook(book.get());

		bookLoan.setLoanDate(LocalDateTime.now());
		bookLoan.setReturnDate(LocalDateTime.now().plusDays(7));

		bookLoanRepository.save(bookLoan);
		return ResponseEntity.status(HttpStatus.CREATED).body(new EmptyResponse("Empréstimo realizado com sucesso!"));
	}

	public ResponseEntity<EmptyResponse> removeBookLoan(BookLoan book) {
		BookLoan bookLoan = bookLoanRepository.findByBook(book.getBook());
		if (bookLoanRepository.existsById(bookLoan.getId())) {
			bookLoanRepository.deleteById(bookLoan.getId());
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Obra devolvida com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Emprestimo não encontrado"));
	}

}
