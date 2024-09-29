package webservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.domains.location.Location;
import webservice.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String>, JpaSpecificationExecutor<Subject> {

    Page<Subject> findByNameContaining(String name, Pageable pageable);

}
