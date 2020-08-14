package br.com.softplan.model.dto;

import com.sun.istack.NotNull;

import br.com.softplan.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private String id;
	
	@NotNull
	private String name;

	@NotNull
	private String email;
	
	@NotNull
	private Role role;
	
}
