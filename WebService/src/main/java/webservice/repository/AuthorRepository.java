package webservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long>, CrudRepository<Author, Long>{

	Page<Author> findByNameContaining(String name, Pageable pageable);

}
