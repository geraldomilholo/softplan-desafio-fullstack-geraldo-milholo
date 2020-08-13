package br.com.softplan.model.dto;

import com.sun.istack.NotNull;

import br.com.softplan.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDTO {

	private String id;
	
	@NotNull
	private String nome;

	@NotNull
	private String email;
	
	@NotNull
	private Role role;
	
}
