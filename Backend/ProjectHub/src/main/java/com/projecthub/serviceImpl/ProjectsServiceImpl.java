package com.projecthub.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Projects;
import com.projecthub.repository.ProjectsRepository;
import com.projecthub.service.ProjectsService;

@Service
public class ProjectsServiceImpl implements ProjectsService {

	@Autowired
	private ProjectsRepository projectsRepository;
	
	@Override
	public Projects saveProjects(Projects project) {
		return projectsRepository.save(project);
		
	}

	@Override
	public Projects getProjectById(Long id) {
		Projects project = projectsRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("Project With ID: "+id+" not Found"));
		return project;
		
	}

	@Override
	public List<Projects> getAllProjects() {
		
		List<Projects> list = projectsRepository.findAll();
		return list;
	}

	@Override
	public Projects updateProjects(Long id, Projects project) {
		
		return null;
	}

	@Override
	public String deleteProjectById(Long id) {
		Projects users = projectsRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("Project with Id: "+id+" not Found"));
		projectsRepository.deleteById(id);
		return "User With ID:"+id+" Successfully Deleted";
	}

}
