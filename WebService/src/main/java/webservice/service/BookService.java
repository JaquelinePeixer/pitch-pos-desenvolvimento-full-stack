package webservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.domains.book.Book;
import webservice.domains.book.BookSearch;
import webservice.domains.book.BookSimple;
import webservice.domains.location.Location;
import webservice.entity.Author;
import webservice.entity.EmptyResponse;
import webservice.entity.Subject;
import webservice.repository.AuthorRepository;
import webservice.repository.BookRepository;
import webservice.repository.LocationRepository;
import webservice.repository.SubjectRepository;
import webservice.repository.book.BookSearchDao;

@AllArgsConstructor
@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private AuthorRepository authorRepository;

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private SubjectRepository subjectRepository;

	private BookSearchDao bookSearchDao;

	public ResponseEntity<Book> getBookPorId(String id) {
		if (bookRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(bookRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public List<BookSimple> getBookAllFindList(String title) {
		List<Book> listBook = bookRepository.findAllByTitle(title);
		if (listBook == null || listBook.isEmpty()) {
			throw new RuntimeException("Obra não encontrada: " + title);
		}
		return listBook.stream().map(book -> {
			return new BookSimple(book);
		}).collect(Collectors.toList());
	}

	public Page<Book> getBookAll(PageRequest page) {
		return bookRepository.findAll(page);
	}

	public Page<Book> getBookFilter(String title, String author, String subject, Pageable page) {
		BookSearch request = new BookSearch();
		request.setAuthor(author);
		request.setTitle(title);
		request.setSubject(subject);
		return bookSearchDao.findAllByCriteria(request, page);
	}

	public ResponseEntity<EmptyResponse> postBook(Book book) {

		Book newBook = new Book(book.getId(), book.getTitle(), book.getPublicationYear(), book.getPublisherName(),
				book.getVolume(), book.getPageQuantity(), book.getPublicationLocation(), book.getQuantityOfCopies(),
				book.getEdition());

		if (book.getAuthor() != null) {
			Author author = authorRepository.findById(book.getAuthor().getId())
					.orElseThrow(() -> new RuntimeException("Autor não encontrado"));
			newBook.setAuthor(author);
		}

		if (book.getLocation() != null) {
			Location location = locationRepository.findById(book.getLocation().getId())
					.orElseThrow(() -> new RuntimeException("Localização não encontrado"));
			newBook.setLocation(location);
		}

		if (book.getSubject() != null) {
			Subject subject = subjectRepository.findById(book.getSubject().getId())
					.orElseThrow(() -> new RuntimeException("Assunto não encontrado"));
			newBook.setSubject(subject);
		}

		bookRepository.save(newBook);
		return ResponseEntity.status(HttpStatus.CREATED).body(new EmptyResponse("Obra criada com sucesso"));
	}

	public ResponseEntity<EmptyResponse> putBook(String id, Book book) {
		if (bookRepository.existsById(id)) {
			Book newBook = new Book(book.getId(), book.getTitle(), book.getPublicationYear(), book.getPublisherName(),
					book.getVolume(), book.getPageQuantity(), book.getPublicationLocation(), book.getQuantityOfCopies(),
					book.getEdition());

			if (book.getAuthor() != null) {
				Author author = authorRepository.findById(book.getAuthor().getId())
						.orElseThrow(() -> new RuntimeException("Autor não encontrado"));
				newBook.setAuthor(author);
			}

			if (book.getLocation() != null) {
				Location location = locationRepository.findById(book.getLocation().getId())
						.orElseThrow(() -> new RuntimeException("Localização não encontrado"));
				newBook.setLocation(location);
			}

			if (book.getSubject() != null) {
				Subject subject = subjectRepository.findById(book.getSubject().getId())
						.orElseThrow(() -> new RuntimeException("Assunto não encontrado"));
				newBook.setSubject(subject);
			}

			bookRepository.save(newBook);
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
