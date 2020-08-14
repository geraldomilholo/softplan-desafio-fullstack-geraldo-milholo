package br.com.softplan.security.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtUser implements UserDetails {

	private static final long serialVersionUID = 1L;

	private String id;
	private String username;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	private boolean enabled;

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

}
