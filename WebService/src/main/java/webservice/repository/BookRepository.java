package webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import webservice.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
