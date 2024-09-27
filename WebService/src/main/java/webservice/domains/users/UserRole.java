package webservice.domains.users;

public enum UserRole {

	ADMIN("ROLE_ADMIN"), 
	LIBRARIAN("ROLE_LIBRARIAN"), 
	USER("ROLE_USER");

	private String role;

	UserRole(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}
}
