package br.com.softplan.model.dto;

import java.util.List;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProcessDTO {

	private String id;
	
	@NotNull
	private String name;
	
	@Builder.Default
	private Boolean peding = Boolean.FALSE;
	
	private String seem;
	
	private List<String> users;
	
	private List<String> usersNames;
	
}