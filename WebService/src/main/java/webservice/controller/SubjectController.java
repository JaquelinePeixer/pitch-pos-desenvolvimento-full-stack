package webservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import webservice.entity.Subject;
import webservice.service.SubjectService;

@RestController
@RequestMapping("subjects")
@AllArgsConstructor
public class SubjectController {

	private SubjectService subjectService;

	@GetMapping("/{id}")
	public ResponseEntity<Subject> getSubjectPorId(@PathVariable Long id) {
		return subjectService.getSubjectPorId(id);
	}

	@GetMapping
	public List<Subject> getSubjectAll() {
		return subjectService.getSubjectAll();
	}

	@PostMapping
	public ResponseEntity<Subject> postSubject(@RequestBody Subject subject) {
		return subjectService.postSubject(subject);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Subject> putSubject(@PathVariable Long id, @RequestBody Subject subject) {
		return subjectService.putSubject(id, subject);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeSubject(@PathVariable Long id) {
		return subjectService.removeSubject(id);
	}

}
