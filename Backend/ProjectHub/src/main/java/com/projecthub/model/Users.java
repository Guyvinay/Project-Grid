package com.projecthub.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	@NotBlank(message = "email can't be blank")
	@Email(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "email should be in proper format i.e : johndoe@example.com"
	)
	@Column(unique = true)
	private String email;
	private String password;
	private String profile_picture;
	private String role;
	


//	@ManyToMany
//	@JoinTable(
//			name = "user_project",
//			joinColumns = { @JoinColumn(name = "user_id") }, 
//			inverseJoinColumns = { @JoinColumn(name = "project_id") }
//			)
//	private List<Projects> projects;
	
	

	@OneToOne
	@JoinColumn(name = "project_id")
	private Projects project;

	@ManyToOne
	@JoinColumn(name = "team_id")
	private Teams team;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Tasks> task=new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "users_notifications",
			joinColumns = { @JoinColumn(name = "user_id") }, 
			inverseJoinColumns = { @JoinColumn(name = "notification_id") }
			)
	private List<Notifications> notifications=new ArrayList<>();
	
	
}
