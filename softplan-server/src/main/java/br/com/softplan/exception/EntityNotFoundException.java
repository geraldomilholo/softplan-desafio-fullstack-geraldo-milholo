package br.com.softplan.exception;

import org.springframework.http.HttpStatus;

import br.com.softplan.model.BaseEntity;

public class EntityNotFoundException extends SoftplanException {

	private static final long serialVersionUID = -7842969292588503168L;
	
	private final Class<? extends BaseEntity> clazz;
	
	public EntityNotFoundException(Class<? extends BaseEntity> clazz) {
		super(HttpStatus.BAD_REQUEST);
		this.clazz = clazz;
	}

	@Override
	public SoftplanExceptionDTO getExceptionDTO() {
		return SoftplanExceptionDTO.builder()
				.mensagem("Não existe " + clazz.getSimpleName() + " para o id informado")
				.build();
	}

}
