package webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.domains.book.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, String>, CrudRepository<Book, String> {

}
