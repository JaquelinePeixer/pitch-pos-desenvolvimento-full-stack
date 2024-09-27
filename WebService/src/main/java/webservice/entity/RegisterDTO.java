package webservice.entity;

import java.time.LocalDateTime;

import webservice.domains.users.UserRole;
import webservice.enumeration.UserSituationEnum;

public record RegisterDTO(String name, LocalDateTime birthDate, String email, UserRole role, String cpf,
		String password, UserSituationEnum userSituation) {

}
