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
import webservice.entity.ResponseModel;
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

	public List<Author> getAuthorAllFindList(String name) {
		return authorRepository.findAllByName(name);
	}

	public Page<Author> authorFilter(String name, Pageable page) {
		return authorRepository.findByNameContaining(name, page);
	}

	public ResponseEntity<Author> postAuthor(Author author) {
		Author authorSave = authorRepository.save(author);
		return ResponseEntity.status(HttpStatus.CREATED).body(authorSave);
	}

	public ResponseEntity<ResponseModel> putAuthor(Long id, Author author) {
		if (authorRepository.existsById(id)) {
			authorRepository.save(author);
			ResponseModel responseModel = new ResponseModel(1, "Autor atualizado");
			return ResponseEntity.status(HttpStatus.OK).body(responseModel);
		}
		ResponseModel responseModelError = new ResponseModel(2, "Autor não encontrado");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
	}

	public ResponseEntity<ResponseModel> removeAuthor(Long id) {
		if (authorRepository.existsById(id)) {
			authorRepository.deleteById(id);
			ResponseModel responseModel = new ResponseModel(1, "Autor removido com sucesso");
			return ResponseEntity.status(HttpStatus.OK).body(responseModel);
		}
		ResponseModel responseModelError = new ResponseModel(2, "Autor não encontrado");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
	}
}
