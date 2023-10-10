package com.projecthub.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Users;
import com.projecthub.repository.UsersRepository;
import com.projecthub.service.UsersService;

@Service
public class UserServiceImpl implements UsersService {

	@Autowired
	private UsersRepository usersRepository;
	
	@Override
	public Users saveUsers(Users user) {
		
		return usersRepository.save(user);
	}

	@Override
	public Users getUserById(Long id) {
		Users user = usersRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("User With ID: "+id+" not Found"));
		return user;
	}

	@Override
	public List<Users> getAllUsers() {
		List<Users> list = usersRepository.findAll();
		return list;
	}

	@Override
	public Users updateUsers(Long id, Users user) {
		Users users = usersRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("User not Found"));
		users.setProfile_picture(user.getProfile_picture());
		users.setRole(user.getRole());
		return users;
	}

	@Override
	public String deleteUserById(Long id) {
		Users users = usersRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("User with Id: "+id+" not Found"));
		usersRepository.deleteById(id);
		return "User With ID:"+id+" Successfully Deleted";
	}

	@Override
	public Users getUserByEmail(String email) {
		return usersRepository.findByEmail(email).orElseThrow(
				()->new EntryNotFoundException("User with email: "+email+" not Found"));
		
	}

}
