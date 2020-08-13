package br.com.softplan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.softplan.model.dto.UserDTO;
import br.com.softplan.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<List<UserDTO>> findAll() {
		return ResponseEntity.ok(userService.findAll());
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDTO> getUsuarioById(@PathVariable String userId) {
		return ResponseEntity.ok(userService.findById(userId));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<UserDTO> updateUsuarioById(@PathVariable String usuarioId, @RequestBody UserDTO userDTO) {
		userDTO.setId(usuarioId);
		return ResponseEntity.ok(userService.save(userDTO));
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> save(@RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.save(userDTO));
	}
	
}
