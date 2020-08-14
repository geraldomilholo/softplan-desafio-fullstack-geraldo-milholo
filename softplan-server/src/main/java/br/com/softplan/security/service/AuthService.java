package br.com.softplan.security.service;

import javax.security.auth.login.LoginException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.softplan.model.User;
import br.com.softplan.repository.UserRepository;
import br.com.softplan.security.jwt.JwtProvider;
import br.com.softplan.security.model.dto.LoginDTO;
import br.com.softplan.security.model.dto.TokenDTO;
import br.com.softplan.security.model.dto.UserDTO;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	private static final String BEARER = "Bearer";

	public LoginDTO logar(UserDTO userDTO) throws LoginException {
		User user = userRepository.findByEmail(userDTO.getEmail()).orElseThrow(() -> new LoginException(userDTO.getEmail()));
		
		if (encoder.matches(userDTO.getPassword(), user.getPassword())) {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
			String token = jwtProvider.obtainToken(userDetails);
			
			return LoginDTO.builder()
					.id(user.getId())
					.token(token)
					.role(user.getRole())
					.name(user.getName())
					.email(user.getEmail())
					.build();
		} else {
			throw new LoginException(userDTO.getEmail());
		}
	}

	public TokenDTO refresh(String token) {
		String refreshedToken = jwtProvider.refreshToken(token.split(BEARER)[1].trim());
		return new TokenDTO(refreshedToken);
	}

}
