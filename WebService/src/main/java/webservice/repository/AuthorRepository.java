package webservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import webservice.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, String>, CrudRepository<Author, String> {

	Page<Author> findByNameContaining(String name, Pageable pageable);

	@Query(value = "SELECT * FROM author a WHERE (:name is null or a.name LIKE %:name%)", nativeQuery = true)
	List<Author> findAllByName(@Param("name") String name);

}
