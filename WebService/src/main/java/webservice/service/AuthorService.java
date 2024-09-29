package webservice.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.Author;
import webservice.entity.EmptyResponse;
import webservice.repository.AuthorRepository;

@AllArgsConstructor
@Service
public class AuthorService {

	private AuthorRepository authorRepository;

	public ResponseEntity<Author> getAuthorPorId(String id) {
		if (authorRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(authorRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public Page<Author> getAuthorAll(PageRequest page) {
		return authorRepository.findAll(page);
	}

	public List<Author> getAuthorAllFindList(String name) {
		return authorRepository.findAllByName(name);
	}

	public Page<Author> authorFilter(String name, Pageable page) {
		return authorRepository.findByNameContaining(name, page);
	}

	public ResponseEntity<EmptyResponse> postAuthor(Author author) {
		authorRepository.save(author);
		return ResponseEntity.status(HttpStatus.CREATED).body(new EmptyResponse("Autor criado com sucesso"));
	}

	public ResponseEntity<EmptyResponse> putAuthor(String id, Author author) {
		if (authorRepository.existsById(id)) {
			authorRepository.save(author);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Autor salvo com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Autor não encontrado"));
	}

	public ResponseEntity<EmptyResponse> removeAuthor(String id) {
		if (authorRepository.existsById(id)) {
			authorRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Autor removido com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Autor não encontrado"));
	}
}
