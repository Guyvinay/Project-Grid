package com.projecthub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthub.model.Tasks;
import com.projecthub.service.TasksService;

@RestController
@RequestMapping("/projectGrid")
public class TasksController {

	@Autowired
	private TasksService tasksService;
	
	@PostMapping(value = "/createTasks")
	public ResponseEntity<Tasks> saveTasks(@RequestBody Tasks task){
		return new ResponseEntity<Tasks>(tasksService.saveTasks(task),HttpStatus.ACCEPTED);
	}
}
