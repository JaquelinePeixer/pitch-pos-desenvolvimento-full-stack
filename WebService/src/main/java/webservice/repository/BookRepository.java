package webservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import webservice.domains.book.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {

	@Query(value = "SELECT * FROM book a WHERE (:title is null or a.title LIKE %:title%)", nativeQuery = true)
	List<Book> findAllByTitle(@Param("title") String title);

}
