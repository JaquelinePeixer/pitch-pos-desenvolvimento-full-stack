package entity;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private Long id;

	private String name;

	private String email;

	private LocalDate birthDate;

	private Integer cpf;

	@Column(name = "user_situation")
	@Enumerated(EnumType.STRING)
	private Enum userSituation;

	private LocalDate creationDate;

	private String creationUser;

	@OneToMany(mappedBy = "book")
	private Set<Book> fk_book;

}
