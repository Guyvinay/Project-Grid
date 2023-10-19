package com.projecthub.service;

import java.util.List;

import com.projecthub.model.Tasks;

public interface TasksService {

	public Tasks saveTasks(Tasks task);
	public Tasks getTaskById(Long id);
	public List<Tasks> getAllTasks();
	public Tasks updateTasks(Long id , Tasks task);
	public Tasks deleteTaskById(Long id);
	
}
