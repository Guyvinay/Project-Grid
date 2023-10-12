package com.projecthub.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long profile_id;
	@NotBlank(message = "email can't be blank")
	@Email(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "email should be in proper format i.e : johndoe@example.com"
	)
	@Column(unique = true)
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
//	@NotNull(message = "Role Cannot be null!")
	private String role;
//	@NotNull(message = "Name Cannot be null!")
	private String name;
	private String profile_picture;
	
	
	

	public Profile() {
		super();
	}



	public Profile(
			@NotBlank(message = "email can't be blank") @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "email should be in proper format i.e : johndoe@example.com") String email,
			String password, String role, String name, String profile_picture) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		this.name = name;
		this.profile_picture = profile_picture;
	}
	
}
