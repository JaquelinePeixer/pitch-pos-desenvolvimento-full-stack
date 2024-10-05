package webservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import webservice.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String>, JpaSpecificationExecutor<Subject> {

    Page<Subject> findByNameContaining(String name, Pageable pageable);
    
	@Query(value = "SELECT * FROM subject a WHERE (:name is null or a.name LIKE %:name%)", nativeQuery = true)
	List<Subject> findAllByName(String name);

}
