package webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.domains.book.BookLoan;

@Repository
public interface BookLoanRepository extends JpaRepository<BookLoan, String>, CrudRepository<BookLoan, String>{

}
