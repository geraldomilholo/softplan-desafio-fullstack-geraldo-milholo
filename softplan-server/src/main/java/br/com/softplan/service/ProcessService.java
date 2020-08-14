package br.com.softplan.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import br.com.softplan.component.CopyComponent;
import br.com.softplan.exception.EntityNotFoundException;
import br.com.softplan.model.Process;
import br.com.softplan.model.Role;
import br.com.softplan.model.User;
import br.com.softplan.model.UserProcess;
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
	
	@Autowired
	private UserProcessService userProcessService;
	
	public List<ProcessDTO> findAll() {
		List<ProcessDTO> process = new ArrayList<>();
		
		User currentUser = userService.getCurrentUser();
		if (currentUser.getRole().getCode().equals(Role.Code.FINALIZADOR)) {
			process.addAll(userProcessRepository.findByUserIdAndPeding(currentUser.getId(), Boolean.TRUE).stream()
					.map(up -> formatDto(up.getProcess()))
					.collect(Collectors.toList()));
		} else {
			process.addAll(processRepository.findAll().stream()
					.map(p -> formatDto(p))
					.collect(Collectors.toList()));
		}
		
		return process;
	}
	
	private ProcessDTO formatDto(Process process) {
		ProcessDTO processDTO = copyComponent.copyEntityToDto(process, ProcessDTO.class);
		List<UserProcess> userProcesses = userProcessService.findByProcessId(process.getId());
		
		processDTO.setUsers(userProcesses.stream().map(up -> up.getUser().getId()).collect(Collectors.toList()));
		processDTO.setUsersNames(userProcesses.stream().map(up -> up.getUser().getName()).collect(Collectors.toList()));
		
		return processDTO;
	}
	
	public ProcessDTO findById(String processId) {
		return processRepository.findById(processId)
				.map(p -> formatDto(p))
				.orElseThrow(() -> new EntityNotFoundException(Process.class));
	}
	
	public ProcessDTO save(ProcessDTO processDTO) {
		Process process = copyComponent.copyDtoToEntity(processDTO, Process.class);
		if (!StringUtils.isEmpty(processDTO.getSeem())) {
			process.setPeding(Boolean.FALSE);
		} else {
			process.setPeding(Boolean.TRUE);
		}
		
		Process savedProcess = processRepository.save(process);
		userProcessService.vinculateUsers(savedProcess.getId(), processDTO.getUsers());
		
		return formatDto(savedProcess);
	}

	@Transactional
	public void delete(String id) {
		processRepository.findById(id).map(p -> {
			userProcessService.deleteFromProcessId(id);
			processRepository.delete(p);
			return p;
		}).orElseThrow(() -> new EntityNotFoundException(Process.class));
	}

}
