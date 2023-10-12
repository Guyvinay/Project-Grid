package com.projecthub.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Projects;
import com.projecthub.model.Users;
import com.projecthub.repository.ProjectsRepository;
import com.projecthub.repository.UsersRepository;
import com.projecthub.service.ProjectsService;

@Service
public class ProjectsServiceImpl implements ProjectsService {

	@Autowired
	private ProjectsRepository projectsRepository;
	
	@Autowired
	private UsersRepository usersRepository;
	
	@Override
	public Projects saveProjects(Projects project) {
		
		List<String> users = project.getToAddUsers();
		for(String str : users) {
			Users user = usersRepository.findByEmail(str)
					.orElseThrow(()-> new EntryNotFoundException("This user doesn't exists!"));
			System.out.println(user.getName());
			project.getUsers().add(user);
			user.getProjects().add(project);
		}
		
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
