package br.com.softplan.controller;

import javax.security.auth.login.LoginException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.softplan.security.model.dto.LoginDTO;
import br.com.softplan.security.model.dto.UserDTO;
import br.com.softplan.security.service.AuthService;

@RestController
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<LoginDTO> login(@Valid @RequestBody UserDTO userDTO) throws LoginException {
		return ResponseEntity.ok(authService.logar(userDTO));
	}
	
}
