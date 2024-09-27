package webservice.entity;

import webservice.domains.users.UserRole;

public record LoginResponseDTO(String token, UserRole role, String name) {
	
}
