package webservice.entity;

import webservice.domains.users.UserRole;

public record RegisterDTO(String email, String password, UserRole role) {

}
