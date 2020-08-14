package br.com.softplan.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import br.com.softplan.model.User;

@Repository
public interface UserRepository extends BaseRepository<User> {

	boolean existsByEmail(String email);
	
	Optional<User> findByEmail(String email);
	
}
