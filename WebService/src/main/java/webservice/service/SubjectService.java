package webservice.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.EmptyResponse;
import webservice.entity.Subject;
import webservice.repository.SubjectRepository;

@AllArgsConstructor
@Service
public class SubjectService {

	private SubjectRepository subjectRepository;

	public ResponseEntity<Subject> getSubjectPorId(String id) {
		if (subjectRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(subjectRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public Page<Subject> getSubjectAll(PageRequest page) {
		return subjectRepository.findAll(page);
	}
	
	public List<Subject> getSubjectAllFindList(String name) {
		return subjectRepository.findAllByName(name);
	}

	public Page<Subject> subjectFilter(String name, Pageable page) {
		return subjectRepository.findByNameContaining(name, page);
	}

	public ResponseEntity<EmptyResponse> postSubject(Subject subject) {
		subjectRepository.save(subject);
		return ResponseEntity.status(HttpStatus.CREATED).body(new EmptyResponse("Assunto criado com sucesso"));
	}

	public ResponseEntity<EmptyResponse> putSubject(String id, Subject subject) {
		if (subjectRepository.existsById(id)) {
			subjectRepository.save(subject);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Assunto salvo com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Assunto não encontrado"));
	}

	public ResponseEntity<EmptyResponse> removeSubject(String id) {
		if (subjectRepository.existsById(id)) {
			subjectRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Assunto removido com sucesso"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Assunto não encontrado"));
	}
}
