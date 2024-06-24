package webservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long>, CrudRepository<Subject, Long> {

    Page<Subject> findByNameContaining(String name, Pageable pageable);

}
