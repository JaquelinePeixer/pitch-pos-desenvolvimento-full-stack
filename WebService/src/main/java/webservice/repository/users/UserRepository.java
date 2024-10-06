package webservice.repository.users;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import webservice.domains.users.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {

	UserDetails findByEmail(String email);
	
	Page<User> findByNameContainingAndDelayedUsers(String name, Boolean delayedUsers, Pageable pageable);

	boolean existsByEmail(String email);

	Optional<User> findByCpf(String cpf);
	
	Optional<User> findUserByEmail(String email);
}