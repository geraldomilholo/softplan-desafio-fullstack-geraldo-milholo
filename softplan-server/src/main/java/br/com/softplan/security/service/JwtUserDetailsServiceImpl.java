package br.com.softplan.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.softplan.model.User;
import br.com.softplan.repository.UserRepository;
import br.com.softplan.security.jwt.JwtUserFactory;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUserFactory jwtUserFactory;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByEmail(email);
		if (user.isPresent()) {
			return jwtUserFactory.build(user.get());
		} else {
			throw new UsernameNotFoundException("Email not found.");
		}
	}

}
