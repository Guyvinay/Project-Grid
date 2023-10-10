package com.projecthub.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.model.Tasks;
import com.projecthub.repository.TasksRepository;
import com.projecthub.service.TasksService;

@Service
public class TasksServiceImpl implements TasksService {

	@Autowired
	private TasksRepository tasksRepository;
	
	@Override
	public Tasks saveTasks(Tasks task, Long projectId) {
		
		return null;
	}

	@Override
	public Tasks getTaskById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Tasks> getAllTasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tasks updateTasks(Long id, Tasks task) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tasks deleteTaskById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
