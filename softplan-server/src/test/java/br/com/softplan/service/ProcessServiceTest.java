package br.com.softplan.service;

import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import br.com.softplan.model.Role;
import br.com.softplan.model.User;
import br.com.softplan.repository.UserProcessRepository;

@RunWith(MockitoJUnitRunner.class)
class ProcessServiceTest {
	
	@InjectMocks
	private ProcessService target = new ProcessService();

	@Mock
	private UserService userService = new UserService(); 
	
	@Mock
	private UserProcessRepository userProcessRepository;
	
	@Before
	public void setup() {
	    MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void test() {
		when(userService.getCurrentUser()).thenReturn(createAdmin());
		
		target.findAll();
	}
	
	private User createAdmin() {
		return User.builder()
				.role(Role.builder().code(Role.Code.ADMIN).build())
				.build();
	}

}
