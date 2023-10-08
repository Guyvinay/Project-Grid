package com.projecthub.model;

import java.util.List;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;
	private String password;
	private String role;
	private String profile_picture;
	
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
	
	@OneToMany(mappedBy = "user")
	private List<Tasks> task;
	
	@ManyToMany
	@JoinTable(
			name = "users_notifications",
			joinColumns = { @JoinColumn(name = "user_id") }, 
			inverseJoinColumns = { @JoinColumn(name = "notification_id") }
			)
	private List<Notifications> notifications;
	
	
}
