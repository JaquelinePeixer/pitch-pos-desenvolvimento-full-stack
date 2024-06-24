package webservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import webservice.entity.ResponseModel;
import webservice.entity.Subject;
import webservice.service.SubjectService;

@RestController
@RequestMapping("subjects")
@AllArgsConstructor
@Tag(name = "Subjects")
public class SubjectController {

	private SubjectService subjectService;

	@GetMapping("/{id}")
	public ResponseEntity<Subject> getSubjectPorId(@PathVariable Long id) {
		return subjectService.getSubjectPorId(id);
	}

	@GetMapping
	public Page<Subject> getAuthorAll(@RequestParam(required = false) String name,
			@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "5") Integer pageSize) {
		if (name != null) {
			return subjectService.subjectFilter(name, PageRequest.of(page, pageSize));
		} else {
			return subjectService.getSubjectAll(PageRequest.of(page, pageSize));
		}
	}

	@PostMapping
	public ResponseEntity<Subject> postSubject(@RequestBody Subject subject) {
		return subjectService.postSubject(subject);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ResponseModel> putSubject(@PathVariable Long id, @RequestBody Subject subject) {
		return subjectService.putSubject(id, subject);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseModel> removeSubject(@PathVariable Long id) {
		return subjectService.removeSubject(id);
	}

}
