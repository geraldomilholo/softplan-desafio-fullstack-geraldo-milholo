package br.com.softplan.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public abstract class SoftplanException extends RuntimeException {

	private static final long serialVersionUID = 1694126086950366275L;
	
	@Getter
	private final HttpStatus httpStatus;
	
	public abstract SoftplanExceptionDTO getExceptionDTO();
	
	protected SoftplanException(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}
}
