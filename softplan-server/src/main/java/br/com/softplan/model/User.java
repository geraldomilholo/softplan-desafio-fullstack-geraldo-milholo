package br.com.softplan.model;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "id", length = 36))
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	
	@Column
	private String name;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@ManyToOne
	private Role role;
	
}
