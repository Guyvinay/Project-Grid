package com.projecthub.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Projects;
import com.projecthub.service.ProjectsService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api/projects")
@CrossOrigin(value = "*")
@Slf4j
public class ProjectsController {

	@Autowired
	private ProjectsService projectsService;
	
	@PostMapping(value = "/createProject")
	public ResponseEntity<Projects> saveProjects( @Valid @RequestBody Projects project){
		if(project==null)
			throw new EntryNotFoundException("Project cannot be null, Value must be passed! ");
		return new ResponseEntity<Projects>(projectsService.saveProjects(project),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/projects/{id}")
	public ResponseEntity<Projects> getProjectById( @PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		return new ResponseEntity<Projects>(
				projectsService.getProjectById(id),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/getAllProjects")
	public ResponseEntity<Map<String, Object>> getAllProjects(){
		 log.info("From Projects Controller getAll Projects Method ");
		return  new ResponseEntity<Map<String, Object>>(
				projectsService.getAllProjects(),HttpStatus.ACCEPTED); 
	}

	@PutMapping(value = "/updateProject/{id}")
	public ResponseEntity<Projects> updateProjects(
			@PathVariable("id") Long id,@RequestBody Projects user) {
		
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		if(user==null)
			throw new EntryNotFoundException("Project cannot be null, Value must be passed! ");
		return new ResponseEntity<Projects>(
				projectsService.updateProjects(id,user),HttpStatus.ACCEPTED);
	}

	@DeleteMapping(value = "deleteProject/{id}")
	public ResponseEntity<String> deleteProjectById(@PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		
		return new ResponseEntity<String>(
				projectsService.deleteProjectById(id),HttpStatus.ACCEPTED);
	}
	
	
	
	
}
