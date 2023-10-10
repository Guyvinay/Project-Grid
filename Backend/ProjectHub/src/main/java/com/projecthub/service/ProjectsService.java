package com.projecthub.service;

import java.util.List;

import com.projecthub.model.Projects;

public interface ProjectsService {

	public Projects saveProjects(Projects project);
	public Projects getProjectById(Long id);
	public List<Projects> getAllProjects();
	public Projects updateProjects(Long id , Projects project);
	public String deleteProjectById(Long id);
	
}
