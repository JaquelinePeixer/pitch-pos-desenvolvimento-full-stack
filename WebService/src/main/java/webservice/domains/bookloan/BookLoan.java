package webservice.domains.bookloan;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import webservice.domains.book.Book;
import webservice.domains.users.User;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookLoan {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToOne
	@JoinColumn(name = "book_id")
	private Book book;

	private LocalDateTime loanDate;

	private LocalDateTime returnDate;

}
