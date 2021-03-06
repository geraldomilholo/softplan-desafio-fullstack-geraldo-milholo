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
public class UserProcessDTO {

	@NotNull
	private String processId;
	
	private List<String> userIds;
	
}
