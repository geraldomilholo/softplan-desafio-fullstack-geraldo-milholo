package br.com.softplan.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.softplan.component.CopyComponent;
import br.com.softplan.exception.EntityNotFoundException;
import br.com.softplan.model.Process;
import br.com.softplan.model.Role;
import br.com.softplan.model.User;
import br.com.softplan.model.dto.ProcessDTO;
import br.com.softplan.repository.ProcessRepository;
import br.com.softplan.repository.UserProcessRepository;

@Service
public class ProcessService {

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private CopyComponent copyComponent;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserProcessRepository userProcessRepository;
	
	public List<ProcessDTO> findAll() {
		List<ProcessDTO> process = new ArrayList<>();
		
		User currentUser = userService.getCurrentUser();
		if (currentUser.getRole().getCode().equals(Role.Code.TRIADOR)) {
			process.addAll(processRepository.findAll().stream()
					.map(u -> copyComponent.copyEntityToDto(u, ProcessDTO.class))
					.collect(Collectors.toList()));
		} else if (currentUser.getRole().getCode().equals(Role.Code.FINALIZADOR)) {
			process.addAll(userProcessRepository.findByUserIdAndPeding(currentUser.getId()).stream()
					.map(up -> copyComponent.copyEntityToDto(up.getProcess(), ProcessDTO.class))
					.collect(Collectors.toList()));
		}
		
		return process;
	}
	
	public ProcessDTO findById(String userId) {
		return processRepository.findById(userId)
				.map(u -> copyComponent.copyEntityToDto(u, ProcessDTO.class))
				.orElseThrow(() -> new EntityNotFoundException(Process.class));
	}
	
	public ProcessDTO save(ProcessDTO processDTO) {
		Process savedProcess = processRepository.save(copyComponent.copyDtoToEntity(processDTO, Process.class));
		
		processDTO.setId(savedProcess.getId());
		return processDTO;
	}

}
