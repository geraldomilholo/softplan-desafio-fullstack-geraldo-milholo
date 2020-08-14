package br.com.softplan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.softplan.exception.EntityNotFoundException;
import br.com.softplan.model.Process;
import br.com.softplan.model.User;
import br.com.softplan.model.UserProcess;
import br.com.softplan.repository.ProcessRepository;
import br.com.softplan.repository.UserProcessRepository;
import br.com.softplan.repository.UserRepository;

@Service
public class UserProcessService {

	@Autowired
	private UserProcessRepository userProcessRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProcessRepository processRepository;
	
	@Transactional
	public void vinculateUsers(String processId, List<String> userIds) {
		
		Process process = processRepository.findById(processId)
				.orElseThrow(() -> new EntityNotFoundException(Process.class));
		
		userProcessRepository.deleteByProcessId(process.getId());
		if (userIds != null) {
			userIds.forEach(userId -> {
				userProcessRepository.save(UserProcess.builder()
						.process(process)
						.user(userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException(User.class)))
						.build());
			});
		}
	}

	public void deleteFromUserId(String userId) {
		userProcessRepository.deleteAll(userProcessRepository.findByUserId(userId));
	}
	
	public void deleteFromProcessId(String processId) {
		userProcessRepository.deleteAll(userProcessRepository.findByProcessId(processId));
	}

	public List<UserProcess> findByProcessId(String processId) {
		return userProcessRepository.findByProcessId(processId);
	}
	
}
