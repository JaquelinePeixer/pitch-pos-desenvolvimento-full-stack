package webservice.domains.bookloan;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookLoanDTO {

	private String bookTitle;
	private LocalDateTime loanDate;
	private LocalDateTime returnDate;

}
