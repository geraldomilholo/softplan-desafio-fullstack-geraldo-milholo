package br.com.softplan.security.jwt;

import java.util.Arrays;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import br.com.softplan.model.Role;
import br.com.softplan.model.User;
import br.com.softplan.security.model.JwtUser;

@Component
public class JwtUserFactory {

	public JwtUser build(User user) {
		return new JwtUser(user.getId(), user.getEmail(), user.getPassword(), mapToGrantedAuthorities(user.getRole()), true);
	}

	private List<GrantedAuthority> mapToGrantedAuthorities(Role role) {
		return Arrays.asList(new SimpleGrantedAuthority(role.getCode().name()));
	}

}
