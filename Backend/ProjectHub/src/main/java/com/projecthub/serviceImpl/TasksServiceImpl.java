package com.projecthub.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.model.Tasks;
import com.projecthub.model.Users;
import com.projecthub.repository.TasksRepository;
import com.projecthub.repository.UsersRepository;
import com.projecthub.service.TasksService;

@Service
public class TasksServiceImpl implements TasksService {

	@Autowired
	private TasksRepository tasksRepository;
	
	@Autowired
	private UsersRepository usersRepository;
	
	@Override
	public Tasks saveTasks(Tasks task) {
		String userEmail = task.getUserEmail();
		Users user = usersRepository.findByEmail(userEmail).get();
		task.setUser(user);
		user.getTask().add(task);
		return tasksRepository.save(task);
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
