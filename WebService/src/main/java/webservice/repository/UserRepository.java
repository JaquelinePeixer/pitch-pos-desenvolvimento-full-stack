package webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import webservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	UserDetails findByEmail(String email);

}
