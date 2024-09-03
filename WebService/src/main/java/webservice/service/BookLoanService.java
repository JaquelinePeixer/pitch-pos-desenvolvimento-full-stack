package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.BookLoan;
import webservice.repository.BookLoanRepository;

@AllArgsConstructor
@Service
public class BookLoanService {

	  private BookLoanRepository bookLoanRepository;

	    public ResponseEntity<BookLoan> getBookPorId(String id) {
	        if (bookLoanRepository.existsById(id)) {
	            return ResponseEntity.status(HttpStatus.OK).body(bookLoanRepository.findById(id).get());
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }

	    public Page<BookLoan> getBookAll(PageRequest pageRequest) {
	        return (Page<BookLoan>) bookLoanRepository.findAll();
	    }

	    public ResponseEntity<BookLoan> postBook(BookLoan book) {
	    	BookLoan bookSave = bookLoanRepository.save(book);
	        return ResponseEntity.status(HttpStatus.CREATED).body(bookSave);
	    }

	    public ResponseEntity<BookLoan> putBook(String id, BookLoan book) {
	        if (bookLoanRepository.existsById(id)) {
	        	BookLoan bookSave = bookLoanRepository.save(book);
	            return ResponseEntity.status(HttpStatus.OK).body(bookSave);
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }

	    public ResponseEntity<String> removeBook(String id) {
	        if (bookLoanRepository.existsById(id)) {
	        	bookLoanRepository.deleteById(id);
	            return ResponseEntity.status(HttpStatus.OK).body("Success");
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book não encontrado");
	    }

	    public Page<BookLoan> bookFilter(String title, String author_id, String id, PageRequest of) {
	        return null;
	    }
	    
}
