package com.projecthub.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthub.model.Tasks;
import com.projecthub.service.TasksService;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {

	@Autowired
	private TasksService tasksService;
	
	@PostMapping(value = "/createTask")
	public ResponseEntity<Tasks> saveTasks(@RequestBody Tasks task){
		return new ResponseEntity<Tasks>(tasksService.saveTasks(task),HttpStatus.ACCEPTED);
	}
	@GetMapping(value = "/getAllTasks")
	public ResponseEntity<Map<String, Object>> getAllTasks(){
		return new ResponseEntity<Map<String, Object>>(tasksService.getAllTasks(),HttpStatus.ACCEPTED);
	}
	@DeleteMapping(value = "/deleteTask/{id}")
	public ResponseEntity<Map<String, Object>> deletetaskById(@PathVariable("id")Long id){
		return new ResponseEntity<Map<String, Object>>(tasksService.deleteTaskById(id),HttpStatus.ACCEPTED);
	}
}
