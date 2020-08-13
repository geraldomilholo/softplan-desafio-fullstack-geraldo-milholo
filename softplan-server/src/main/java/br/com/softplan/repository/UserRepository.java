package br.com.softplan.repository;

import org.springframework.stereotype.Repository;

import br.com.softplan.model.User;

@Repository
public interface UserRepository extends BaseRepository<User> {

	boolean existsByEmail(String email);
	
	User findByEmail(String email);
	
}
