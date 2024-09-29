package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.book.Book;
import webservice.domains.book.BookSearch;
import webservice.entity.EmptyResponse;
import webservice.repository.BookRepository;
import webservice.repository.book.BookSearchDao;

@AllArgsConstructor
@Service
public class BookService {

	private BookRepository bookRepository;

	private BookSearchDao bookSearchDao;

	public ResponseEntity<Book> getBookPorId(String id) {
		if (bookRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(bookRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public Page<Book> getBookAll(PageRequest page) {
		return bookRepository.findAll(page);
	}

	public Page<Book> getBookFilter(String author, String title, Pageable page) {
		BookSearch request = new BookSearch();
		request.setAuthor(author);
		request.setTitle(title);
		return bookSearchDao.findAllByCriteria(request, page);
	}

	public ResponseEntity<EmptyResponse> postBook(Book book) {
		bookRepository.save(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(new EmptyResponse("Obra criada com sucesso"));
	}

	public ResponseEntity<EmptyResponse> putBook(String id, Book book) {
		if (bookRepository.existsById(id)) {
			bookRepository.save(book);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Obra salva com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Obra não encontrada"));
	}

	public ResponseEntity<EmptyResponse> removeBook(String id) {
		if (bookRepository.existsById(id)) {
			bookRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Obra removida com sucesso"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Obra não encontrada"));
	}

}
