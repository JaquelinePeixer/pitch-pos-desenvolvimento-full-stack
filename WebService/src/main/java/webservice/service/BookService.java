package webservice.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.Book;
import webservice.repository.BookRepository;

@AllArgsConstructor
@Service
public class BookService {

    private BookRepository bookRepository;

    public ResponseEntity<Book> getBookPorId(Long id) {
        if (bookRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(bookRepository.findById(id).get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public List<Book> getBookAll() {
        return bookRepository.findAll();
    }

    public ResponseEntity<Book> postBook(Book book) {
        Book bookSave = bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookSave);
    }

    public ResponseEntity<Book> putBook(Long id, Book book) {
        if (bookRepository.existsById(id)) {
            Book bookSave = bookRepository.save(book);
            return ResponseEntity.status(HttpStatus.OK).body(bookSave);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> removeBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book não encontrado");
    }

}
