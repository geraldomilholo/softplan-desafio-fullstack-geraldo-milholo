package br.com.softplan.model.dto;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProcessDTO {

	private String id;
	
	@NotNull
	private String name;
	
	@Builder.Default
	private Boolean peding = Boolean.FALSE;
	
	private String seem;
	
}