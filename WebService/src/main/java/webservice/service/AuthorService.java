package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.Author;
import webservice.repository.AuthorRepository;

@AllArgsConstructor
@Service
public class AuthorService {

    private AuthorRepository authorRepository;

    public ResponseEntity<Author> getAuthorPorId(Long id) {
        if (authorRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(authorRepository.findById(id).get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public Page<Author> getAuthorAll(PageRequest page) {
        return authorRepository.findAll(page);
    }

    public ResponseEntity<Author> postAuthor(Author author) {
        Author authorSave = authorRepository.save(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(authorSave);
    }

    public ResponseEntity<Author> putAuthor(Long id, Author author) {
        if (authorRepository.existsById(id)) {
            Author authorSave = authorRepository.save(author);
            return ResponseEntity.status(HttpStatus.OK).body(authorSave);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> removeAuthor(Long id) {
        if (authorRepository.existsById(id)) {
            authorRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Author não encontrado");
    }

}
