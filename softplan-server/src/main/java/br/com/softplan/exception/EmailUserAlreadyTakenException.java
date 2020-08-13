package br.com.softplan.exception;

import org.springframework.http.HttpStatus;

public class EmailUserAlreadyTakenException extends SoftplanException {

	private static final long serialVersionUID = -1099853919014279213L;
	private final String email;

	public EmailUserAlreadyTakenException(String email) {
		super(HttpStatus.BAD_REQUEST);
		this.email = email;
	}

	@Override
	public SoftplanExceptionDTO getExceptionDTO() {
		return SoftplanExceptionDTO.builder()
				.mensagem("O email " + email + " já está em uso por outro usuário!")
				.build();
	}

}
