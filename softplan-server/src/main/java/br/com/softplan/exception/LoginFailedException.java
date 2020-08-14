package br.com.softplan.exception;

import org.springframework.http.HttpStatus;

public class LoginFailedException extends SoftplanException {

	private static final long serialVersionUID = -1099853919014279213L;

	public LoginFailedException() {
		super(HttpStatus.UNAUTHORIZED);
	}

	@Override
	public SoftplanExceptionDTO getExceptionDTO() {
		return SoftplanExceptionDTO.builder()
				.mensagem("Verifique os dados informados!")
				.build();
	}

}
