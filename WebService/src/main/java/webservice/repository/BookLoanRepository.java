package webservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.domains.book.Book;
import webservice.domains.bookloan.BookLoan;
import webservice.domains.users.User;

@Repository
public interface BookLoanRepository extends JpaRepository<BookLoan, String>, CrudRepository<BookLoan, String> {

	BookLoan findByBook(Book book);

	Page<BookLoan> findByUser(User user, Pageable pageable);

}
