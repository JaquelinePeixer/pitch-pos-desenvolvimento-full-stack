package webservice.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.Subject;
import webservice.repository.SubjectRepository;

@AllArgsConstructor
@Service
public class SubjectService {

    private SubjectRepository subjectRepository;

    public ResponseEntity<Subject> getSubjectPorId(Long id) {
        if (subjectRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(subjectRepository.findById(id).get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public List<Subject> getSubjectAll() {
        return subjectRepository.findAll();
    }

    public ResponseEntity<Subject> postSubject(Subject subject) {
        Subject subjectSave = subjectRepository.save(subject);
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectSave);
    }

    public ResponseEntity<Subject> putSubject(Long id, Subject subject) {
        if (subjectRepository.existsById(id)) {
            Subject subjectSave = subjectRepository.save(subject);
            return ResponseEntity.status(HttpStatus.OK).body(subjectSave);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> removeSubject(Long id) {
        if (subjectRepository.existsById(id)) {
            subjectRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subject não encontrado");
    }
}
