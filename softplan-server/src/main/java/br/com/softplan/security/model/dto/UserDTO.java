package br.com.softplan.security.model.dto;

import com.sun.istack.NotNull;

import lombok.Data;

@Data
public class UserDTO {

	@NotNull
	private String email;

	@NotNull
	private String password;

}
