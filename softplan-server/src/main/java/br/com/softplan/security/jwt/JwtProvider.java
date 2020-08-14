package br.com.softplan.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {

	private static final String CLAIM_KEY_USERNAME = "sub";
	private static final String CLAIM_KEY_ROLE = "role";
	private static final String CLAIM_KEY_CREATED = "created";
	
	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private Long expiration;

	public String getEmailFromToken(String token) {
		String email;
		try {
			Claims claims = getClaimsFromToken(token);
			email = claims.getSubject();
		} catch (Exception e) {
			email = null;
		}
		return email;
	}

	public Date getExpirationDateFromToken(String token) {
		Date expirationDate;
		Claims claims = getClaimsFromToken(token);
		expirationDate = claims.getExpiration();
		return expirationDate;
	}

	public String refreshToken(String token) {
		String refreshedToken;
		Claims claims = getClaimsFromToken(token);
		claims.put(CLAIM_KEY_CREATED, new Date());
		refreshedToken = generateToken(claims);
		return refreshedToken;
	}

	public boolean isTokenValid(String token) {
		return !isTokenExpired(token);
	}

	public String obtainToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
		userDetails.getAuthorities().forEach(authority -> claims.put(CLAIM_KEY_ROLE, authority.getAuthority()));
		claims.put(CLAIM_KEY_CREATED, new Date());

		return generateToken(claims);
	}

	private Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return claims;
	}

	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + expiration * 1000);
	}

	private boolean isTokenExpired(String token) {
		Date expirationDAte = this.getExpirationDateFromToken(token);
		if (expirationDAte == null)
			return false;
		return expirationDAte.before(new Date());
	}

	private String generateToken(Map<String, Object> claims) {
		return Jwts.builder().setClaims(claims).setExpiration(generateExpirationDate())
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}
}
