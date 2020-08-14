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

import br.com.softplan.model.dto.ProcessDTO;
import br.com.softplan.service.ProcessService;

@RestController
@RequestMapping("/processes")
public class ProcessController {

	@Autowired
	private ProcessService processService;

	@GetMapping
	public ResponseEntity<List<ProcessDTO>> findAll() {
		return ResponseEntity.ok(processService.findAll());
	}

	@GetMapping("/{userId}")
	public ResponseEntity<ProcessDTO> findById(@PathVariable String userId) {
		return ResponseEntity.ok(processService.findById(userId));
	}
	
	@PostMapping
	public ResponseEntity<ProcessDTO> save(@RequestBody ProcessDTO processDTO) {
		return ResponseEntity.ok(processService.save(processDTO));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<ProcessDTO> update(@PathVariable String userId, @RequestBody ProcessDTO processDTO) {
		processDTO.setId(userId);
		return ResponseEntity.ok(processService.save(processDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		processService.delete(id);
		return ResponseEntity.noContent().build();
		
	}
	
}
