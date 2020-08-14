package br.com.softplan.security.model.dto;

import br.com.softplan.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
	
	private String id;
	
	private String token;
	
	private Role role;
	
	private String name;
	
	private String email;
	
}
