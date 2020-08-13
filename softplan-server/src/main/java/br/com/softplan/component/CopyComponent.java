package br.com.softplan.component;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import br.com.softplan.model.BaseEntity;

@Component
public class CopyComponent {
	
	public <T> T copyEntityToDto(BaseEntity entity, Class<T> dtoClazz) {
		return Optional.ofNullable(entity).map(e -> {
			try {

				T dto = dtoClazz.getConstructor().newInstance();

				BeanUtils.copyProperties(entity, dto);

				return dto;
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException ex) {
				return null;
			}
		}).orElse(null);
	}
	
	public <T extends BaseEntity> T copyDtoToEntity(Object dto, Class<T> entityClazz) {
		return Optional.ofNullable(dto).map(e -> {
			try {
				
				T entity = entityClazz.getConstructor().newInstance();
				
				BeanUtils.copyProperties(dto, entity);
				
				return entity;
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException ex) {
				return null;
			}
		}).orElse(null);
	}

}
