package webservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webservice.domains.book.Book;
import webservice.domains.bookloan.BookLoan;
import webservice.domains.users.User;

@Repository
public interface BookLoanRepository extends JpaRepository<BookLoan, String>, CrudRepository<BookLoan, String> {

	BookLoan findByBook(Book book);

	Page<BookLoan> findByUser(User user, Pageable pageable);

	@Query(value = "SELECT * FROM book_loan a WHERE (:bookId is null or a.book_id LIKE %:bookId%)", nativeQuery = true)
	List<BookLoan> findByBookId(String bookId);

}
