package br.com.softplan.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import br.com.softplan.component.CopyComponent;
import br.com.softplan.exception.EmailUserAlreadyTakenException;
import br.com.softplan.exception.EntityNotFoundException;
import br.com.softplan.model.User;
import br.com.softplan.model.dto.UserDTO;
import br.com.softplan.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CopyComponent copyComponent;
	
	public List<UserDTO> findAll() {
		return userRepository.findAll().stream()
				.map(u -> copyComponent.copyEntityToDto(u, UserDTO.class))
				.collect(Collectors.toList());
	}
	
	public UserDTO findById(String userId) {
		return userRepository.findById(userId)
				.map(u -> copyComponent.copyEntityToDto(u, UserDTO.class))
				.orElseThrow(() -> new EntityNotFoundException(User.class));
	}
	
	public UserDTO save(UserDTO userDTO) {
		
		User user = copyComponent.copyDtoToEntity(userDTO, User.class);
		if (user.getId() == null && userRepository.existsByEmail(user.getEmail())) {
			throw new EmailUserAlreadyTakenException(user.getEmail());
		}
		
		User savedUser = userRepository.save(user);
		
		userDTO.setId(savedUser.getId());
		return userDTO;
	}
	
	public User getCurrentUser() {
		return userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName().toLowerCase());
	}

}
