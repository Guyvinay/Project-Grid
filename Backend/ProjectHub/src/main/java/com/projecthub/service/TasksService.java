package com.projecthub.service;

import java.util.List;
import java.util.Map;

import com.projecthub.model.Tasks;

public interface TasksService {

	public Tasks saveTasks(Tasks task);
	public Tasks getTaskById(Long id);
	public Map<String, Object> getAllTasks();
	public Tasks updateTasks(Long id , Tasks task);
	public Map<String, Object> deleteTaskById(Long id);
	
}
