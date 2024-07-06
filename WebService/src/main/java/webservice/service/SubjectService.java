package webservice.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.ResponseModel;
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

    public Page<Subject> getSubjectAll(PageRequest page) {
        return subjectRepository.findAll(page);
    }

    public List<Subject> getSubjectAllFindList() {
        return subjectRepository.findAll();
    }

    public Page<Subject> subjectFilter(String name, Pageable page) {
        return subjectRepository.findByNameContaining(name, page);
    }

    public ResponseEntity<Subject> postSubject(Subject subject) {
        Subject subjectSave = subjectRepository.save(subject);
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectSave);
    }

    public ResponseEntity<ResponseModel> putSubject(Long id, Subject subject) {
        if (subjectRepository.existsById(id)) {
            subjectRepository.save(subject);
            ResponseModel responseModel = new ResponseModel(1, "Assunto atualizado");
            return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        }
        ResponseModel responseModelError = new ResponseModel(2, "Autor não encontrado");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
    }

    public ResponseEntity<ResponseModel> removeSubject(Long id) {
        if (subjectRepository.existsById(id)) {
            subjectRepository.deleteById(id);
            ResponseModel responseModel = new ResponseModel(1, "Assunto removido com sucesso");
            return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        }
        ResponseModel responseModelError = new ResponseModel(2, "Autor não encontrado");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
    }
}
