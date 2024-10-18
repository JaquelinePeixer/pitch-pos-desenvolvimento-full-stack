package webservice.domains.book;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webservice.domains.bookloan.BookLoan;
import webservice.domains.location.Location;
import webservice.entity.Author;
import webservice.entity.Subject;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id")
	private String id;

	private String title;

	private String publicationYear;

	private String publisherName;

	private Integer volume;

	private Integer pageQuantity;

	private String publicationLocation;

	private Integer quantityOfCopies;

	private String edition;

	@ManyToOne
	@JoinColumn(name = "fk_author")
	private Author author;

	@ManyToOne
	@JoinColumn(name = "fk_location")
	private Location location;

	@ManyToOne
	@JoinColumn(name = "fk_subject")
	private Subject subject;

	@OneToOne(mappedBy = "book", cascade = CascadeType.ALL)
	@JsonManagedReference
	private BookLoan bookLoan;

	public Book(String id, String title, String publicationYear, String publisherName, Integer volume,
			Integer pageQuantity, String publicationLocation, Integer quantityOfCopies, String edition) {
		this.id = id;
		this.title = title;
		this.publicationYear = publicationYear;
		this.publisherName = publisherName;
		this.volume = volume;
		this.pageQuantity = pageQuantity;
		this.publicationLocation = publicationLocation;
		this.quantityOfCopies = quantityOfCopies;
		this.edition = edition;
	}

}
