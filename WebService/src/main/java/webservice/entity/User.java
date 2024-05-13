package webservice.entity;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String email;

	private LocalDate birthDate;

	private Integer cpf;

	// @Column(name = "user_situation")
	// private UserSituationEnum userSituation;

	private LocalDate creationDate;

	private String creationUser;

	// @OneToMany(mappedBy = "book")
	// private Set<Book> fk_book;

}
