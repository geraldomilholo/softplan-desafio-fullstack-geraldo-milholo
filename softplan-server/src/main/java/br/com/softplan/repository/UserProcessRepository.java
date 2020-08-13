package br.com.softplan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.softplan.model.UserProcess;

@Repository
public interface UserProcessRepository extends BaseRepository<UserProcess> {

	@Query("SELECT up FROM UserProcess up WHERE up.user.id = :userId AND up.process.peding = FALSE")
	List<UserProcess> findByUserIdAndPeding(String userId);
	
	void deleteByProcessId(String processId);
	
}