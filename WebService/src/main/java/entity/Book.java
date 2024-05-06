package entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	@Column(nullable = false, length = 36)
	private Long id;

	private String title;

	@OneToOne()
	@JoinColumn(name = "author")
	private Author fk_author;

	@OneToMany(mappedBy = "secondaryAuthor", fetch = FetchType.EAGER)
	private Set<Author> fk_secondaryAuthor;

	@OneToOne()
	@JoinColumn(name = "location")
	private Location fk_location;

	@OneToMany(mappedBy = "subject", fetch = FetchType.EAGER)
	private Set<Subject> fk_subject;

}
