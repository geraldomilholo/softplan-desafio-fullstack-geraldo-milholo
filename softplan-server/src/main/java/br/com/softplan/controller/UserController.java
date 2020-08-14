package br.com.softplan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.softplan.model.dto.UserDTO;
import br.com.softplan.model.dto.UserPostDTO;
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
	public ResponseEntity<UserDTO> findById(@PathVariable String userId) {
		return ResponseEntity.ok(userService.findById(userId));
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> save(@RequestBody UserPostDTO userPostDTO) {
		return ResponseEntity.ok(userService.save(userPostDTO));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<UserDTO> update(@PathVariable String usuarioId, @RequestBody UserPostDTO userPostDTO) {
		userPostDTO.setId(usuarioId);
		return ResponseEntity.ok(userService.save(userPostDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		userService.delete(id);
		return ResponseEntity.noContent().build();
		
	}
	
}
