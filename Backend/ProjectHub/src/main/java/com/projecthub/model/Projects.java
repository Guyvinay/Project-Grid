package com.projecthub.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Projects {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String description;
	private LocalDate start_date=LocalDate.now();
	private LocalDate end_date;
	
	
//	@ManyToMany(mappedBy = "projects")
//	private List<Users> users;
	
	@OneToOne(mappedBy = "project")
	private Users project_manager;
	
	@JsonIgnore
	@OneToMany(mappedBy = "project")
	private List<Tasks> tasks=new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "project")
	private List<Teams> teams=new ArrayList<>();;
}
