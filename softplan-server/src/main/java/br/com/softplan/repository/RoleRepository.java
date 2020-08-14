package br.com.softplan.repository;

import org.springframework.stereotype.Repository;

import br.com.softplan.model.Role;
import br.com.softplan.model.Role.Code;

@Repository
public interface RoleRepository extends BaseRepository<Role> {

	Role findByCode(Code role);

}
