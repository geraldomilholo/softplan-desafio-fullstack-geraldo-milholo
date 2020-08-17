package br.com.softplan.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.softplan.component.CopyComponent;
import br.com.softplan.exception.EntityNotFoundException;
import br.com.softplan.model.Process;
import br.com.softplan.model.Role;
import br.com.softplan.model.User;
import br.com.softplan.model.UserProcess;
import br.com.softplan.model.dto.ProcessDTO;
import br.com.softplan.repository.ProcessRepository;
import br.com.softplan.repository.UserProcessRepository;

@ExtendWith(MockitoExtension.class)
class ProcessServiceTest {
	
	@InjectMocks
	private ProcessService target;

	@Mock
	private UserService userService;
	
	@Mock
	private UserProcessRepository userProcessRepository;
	
	@Mock
	private ProcessRepository processRepository;
	
	@Mock
	private CopyComponent copyComponent;
	
	@Mock
	private UserProcessService userProcessService;
	
	private Process process1 = new Process();
	private Process process2 = new Process();
	private Process process3 = new Process();
	
	private String FAKE_ID_1 = "fake id 1";
	private String FAKE_ID_2 = "fake id 2";
	private String FAKE_ID_3 = "fake id 3";
	
	@Test
	void admin_findAll() {
		process1.setId(FAKE_ID_1);
		process2.setId(FAKE_ID_2);
		process3.setId(FAKE_ID_3);
		
		List<Process> processes = new ArrayList<>();
		processes.add(process1);
		processes.add(process2);
		processes.add(process3);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		when(userService.getCurrentUser()).thenReturn(User.builder().role(Role.builder().code(Role.Code.ADMIN).build()).build());
		when(processRepository.findAll()).thenReturn(processes);
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		when(userProcessService.findByProcessId(FAKE_ID_2)).thenReturn(new ArrayList<>());
		when(userProcessService.findByProcessId(FAKE_ID_3)).thenReturn(new ArrayList<>());
		
		when(copyComponent.copyEntityToDto(process1, ProcessDTO.class)).thenReturn(new ProcessDTO());
		when(copyComponent.copyEntityToDto(process2, ProcessDTO.class)).thenReturn(new ProcessDTO());
		when(copyComponent.copyEntityToDto(process3, ProcessDTO.class)).thenReturn(new ProcessDTO());
		
		List<ProcessDTO> result = target.findAll();
		assertThat(result.size()).isEqualTo(3);
		assertThat(result.get(0).getUsers().size()).isEqualTo(3);
		assertThat(result.get(1).getUsers().size()).isEqualTo(0);
		assertThat(result.get(2).getUsers().size()).isEqualTo(0);
		
	}
	
	@Test
	void triador_findAll() {
		process1.setId(FAKE_ID_1);
		process2.setId(FAKE_ID_2);
		process3.setId(FAKE_ID_3);
		
		List<Process> processes = new ArrayList<>();
		processes.add(process1);
		processes.add(process2);
		processes.add(process3);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		when(userService.getCurrentUser()).thenReturn(User.builder().role(Role.builder().code(Role.Code.TRIADOR).build()).build());
		when(processRepository.findAll()).thenReturn(processes);
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		when(userProcessService.findByProcessId(FAKE_ID_2)).thenReturn(new ArrayList<>());
		when(userProcessService.findByProcessId(FAKE_ID_3)).thenReturn(new ArrayList<>());
		
		when(copyComponent.copyEntityToDto(process1, ProcessDTO.class)).thenReturn(new ProcessDTO());
		when(copyComponent.copyEntityToDto(process2, ProcessDTO.class)).thenReturn(new ProcessDTO());
		when(copyComponent.copyEntityToDto(process3, ProcessDTO.class)).thenReturn(new ProcessDTO());
		
		List<ProcessDTO> result = target.findAll();
		assertThat(result.size()).isEqualTo(3);
		assertThat(result.get(0).getUsers().size()).isEqualTo(3);
		assertThat(result.get(1).getUsers().size()).isEqualTo(0);
		assertThat(result.get(2).getUsers().size()).isEqualTo(0);
		
	}
	
	@Test
	void finalizador_findAll() {
		process1.setId(FAKE_ID_1);
		process2.setId(FAKE_ID_2);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		List<UserProcess> userProcessResponse = new ArrayList<>();
		userProcessResponse.add(UserProcess.builder().process(process1).build());
		userProcessResponse.add(UserProcess.builder().process(process2).build());
		
		User user = User.builder().role(Role.builder().code(Role.Code.FINALIZADOR).build()).build();
		user.setId(FAKE_ID_1);
		
		when(userService.getCurrentUser()).thenReturn(user);
		when(userProcessRepository.findByUserIdAndPeding(FAKE_ID_1, true)).thenReturn(userProcessResponse);
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		when(userProcessService.findByProcessId(FAKE_ID_2)).thenReturn(new ArrayList<>());
		
		when(copyComponent.copyEntityToDto(process1, ProcessDTO.class)).thenReturn(new ProcessDTO());
		when(copyComponent.copyEntityToDto(process2, ProcessDTO.class)).thenReturn(new ProcessDTO());
		
		List<ProcessDTO> result = target.findAll();
		assertThat(result.size()).isEqualTo(2);
		assertThat(result.get(0).getUsers().size()).isEqualTo(3);
		assertThat(result.get(1).getUsers().size()).isEqualTo(0);
		
	}
	
	@Test
	void findById() {
		process1.setId(FAKE_ID_1);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		when(processRepository.findById(FAKE_ID_1)).thenReturn(Optional.ofNullable(process1));
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		
		when(copyComponent.copyEntityToDto(process1, ProcessDTO.class)).thenReturn(new ProcessDTO());
		
		ProcessDTO result = target.findById(FAKE_ID_1);
		assertThat(result).isNotNull();
		assertThat(result.getUsers().size()).isEqualTo(3);
		
	}
	
	@Test
	void findById_error() {
		Assertions.assertThrows(EntityNotFoundException.class, () -> {
			when(processRepository.findById(FAKE_ID_1)).thenReturn(Optional.empty());
			target.findById(FAKE_ID_1);
	    });
	}
	
	@Test
	void save_withSeem() {

		List<String> users = new ArrayList<>();
		users.add(FAKE_ID_1);
		users.add(FAKE_ID_2);
		
		ProcessDTO processDTO = ProcessDTO.builder()
				.seem("Fake Seem")
				.users(users)
				.build();
		
		Process process = new Process();
		Process savedProcess = new Process();
		savedProcess.setId(FAKE_ID_1);
		savedProcess.setSeem("Fake Seem");
		
		when(processRepository.save(process)).thenReturn(savedProcess);
		when(copyComponent.copyDtoToEntity(processDTO, Process.class)).thenReturn(process);
		doNothing().when(userProcessService).vinculateUsers(FAKE_ID_1, users);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		when(copyComponent.copyEntityToDto(savedProcess, ProcessDTO.class)).thenReturn(processDTO);
		
		ProcessDTO result = target.save(processDTO);
		assertThat(result).isNotNull();
		assertThat(result.getSeem()).isEqualTo("Fake Seem");
		assertThat(result.getPeding()).isEqualTo(false);
		
	}
	
	@Test
	void save_whitoutSeem() {

		List<String> users = new ArrayList<>();
		users.add(FAKE_ID_1);
		users.add(FAKE_ID_2);
		
		ProcessDTO processDTO = ProcessDTO.builder()
				.peding(true)
				.users(users)
				.build();
		
		Process process = new Process();
		Process savedProcess = new Process();
		savedProcess.setId(FAKE_ID_1);
		
		when(processRepository.save(process)).thenReturn(savedProcess);
		when(copyComponent.copyDtoToEntity(processDTO, Process.class)).thenReturn(process);
		doNothing().when(userProcessService).vinculateUsers(FAKE_ID_1, users);
		
		List<UserProcess> userProcess1 = new ArrayList<>();
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		userProcess1.add(UserProcess.builder().user(User.builder().build()).build());
		
		when(userProcessService.findByProcessId(FAKE_ID_1)).thenReturn(userProcess1);
		when(copyComponent.copyEntityToDto(savedProcess, ProcessDTO.class)).thenReturn(processDTO);
		
		ProcessDTO result = target.save(processDTO);
		assertThat(result).isNotNull();
		assertThat(result.getSeem()).isNull();
		assertThat(result.getPeding()).isEqualTo(true);
		
	}

}

