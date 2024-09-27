package webservice.domains.users;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webservice.enumeration.UserSituationEnum;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserResponse {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	private String name;

	private String email;

	private LocalDateTime birthDate;

	private String cpf;

	@Enumerated(EnumType.STRING)
	private UserSituationEnum userSituation;

	@Enumerated(EnumType.STRING)
	private UserRole role;

}
