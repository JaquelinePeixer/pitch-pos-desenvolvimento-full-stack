package webservice.entity;

public record LoginResponseDTO(String token, UserRole role, String name) {
	
}
