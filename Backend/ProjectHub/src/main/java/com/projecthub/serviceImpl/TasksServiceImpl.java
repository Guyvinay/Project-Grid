package com.projecthub.serviceImpl;

import java.util.HashMap;
import java.util.List;
// import java.util.Optional;
import java.util.Map;
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
	public Map<String, Object> getAllTasks() {
		Map<String, Object> map = new HashMap<>();
		List<Tasks> list = tasksRepository.findAll();
		if(list.isEmpty()) {
			map.put("messgae", "Task list Empty!");
			return map;
		}else {
			map.put("tasks", list);
			map.put("total", list.size());
		}
		return map;
	}

	@Override
	public Tasks updateTasks(Long id, Tasks task) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> deleteTaskById(Long id) {
		Map<String, Object> map = new HashMap<>();
		Optional<Tasks> optional = tasksRepository.findById(id);
		if(optional.isEmpty()) {
			map.put("status", "Task with id: "+id+" not found!");
		}else {
			Tasks task = optional.get();
			tasksRepository.delete(task);
			map.put("status","Task with title: "+task.getTitle()+", successfully deleted!");
		}
		return map;
	}

	

	

}
