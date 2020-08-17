package br.com.softplan.service;

import static org.assertj.core.api.Assertions.assertThat;
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
import br.com.softplan.model.User;
import br.com.softplan.model.dto.UserDTO;
import br.com.softplan.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@InjectMocks
	private UserService target;
	
	@Mock
	private UserRepository userRepository;
	
	@Mock
	private CopyComponent copyComponent;
	
	private String FAKE_ID = "fake id";
	
	@Test
	void findAll() {
		User user = new User();
		List<User> users = new ArrayList<>();
		users.add(user);
		users.add(user);
		users.add(user);
		
		when(userRepository.findAll()).thenReturn(users); 
		when(copyComponent.copyEntityToDto(user, UserDTO.class)).thenReturn(new UserDTO());
		
		List<UserDTO> result = target.findAll();
		assertThat(result.size()).isEqualTo(3);
	}
	
	@Test
	void findAll_zero() {
		when(userRepository.findAll()).thenReturn(new ArrayList<>()); 
		
		List<UserDTO> result = target.findAll();
		assertThat(result.size()).isEqualTo(0);
	}

	@Test
	void findById() {
		User user = new User();
		
		when(userRepository.findById(FAKE_ID)).thenReturn(Optional.ofNullable(user)); 
		when(copyComponent.copyEntityToDto(user, UserDTO.class)).thenReturn(new UserDTO());
		
		UserDTO result = target.findById(FAKE_ID);
		assertThat(result).isNotNull();
		
	}
	
	@Test
	void findById_error() {
		Assertions.assertThrows(EntityNotFoundException.class, () -> {
			when(userRepository.findById(FAKE_ID)).thenReturn(Optional.empty());
			target.findById(FAKE_ID);
	    });
	}
	
}
