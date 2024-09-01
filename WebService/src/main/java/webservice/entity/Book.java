package webservice.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
	private Integer publicationYear;
	private String publisherName;
	private Integer volume;
	private Integer pageQuantity;
	private String publicationLocation;
	private Integer quantityOfCopies;
	private String edition;

	@ManyToOne
	@JoinColumn(name = "fk_author")
	private Author author;

	@ManyToMany
	private Set<Author> secondaryAuthor;

	@ManyToOne
	@JoinColumn(name = "fk_location")
	private Location location;

	@ManyToMany
	private Set<Subject> subject;

}
