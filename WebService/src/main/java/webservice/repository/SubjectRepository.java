package webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import webservice.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

}
