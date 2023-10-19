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
@Getter
@Setter
public class Users extends Profile {

	
	
	
	public Users(Projects project, List<Teams> teams, List<Tasks> task, List<Notifications> notifications) {
		super();
		this.project = project;
		this.teams = teams;
		this.task = task;
		this.notifications = notifications;
	}
	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Users(
			@NotBlank(message = "email can't be blank") @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "email should be in proper format i.e : johndoe@example.com") String email,
			String password, String role, String name, String profile_picture) {
		super(email, password, role, name, profile_picture);
		// TODO Auto-generated constructor stub
	}
	
	
	@OneToOne
	@JoinColumn(name = "project_id")
	private Projects project;

	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "user_team",
			joinColumns = { @JoinColumn(name = "user_id") }, 
			inverseJoinColumns = { @JoinColumn(name = "team_id") }
			)
	private List<Teams> teams=new ArrayList<>();
	
//	@JsonIgnore
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
