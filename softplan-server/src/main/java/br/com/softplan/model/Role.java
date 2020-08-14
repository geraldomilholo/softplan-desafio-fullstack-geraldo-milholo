package br.com.softplan.model;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "role", schema = "public")
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "id", length = 36))
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity {
	
	public enum Code {
		ADMIN,
		TRIADOR,
		FINALIZADOR;
	}
	
	@Column
	private String name;
	
	@Column
	@Enumerated(EnumType.STRING)
	private Code code;
	
}
