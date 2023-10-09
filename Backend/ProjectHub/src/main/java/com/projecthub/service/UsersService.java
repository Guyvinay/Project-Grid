package com.projecthub.service;

import java.util.List;


import com.projecthub.model.Users;

public interface UsersService {

	public Users saveUsers(Users user);
	public Users getUserById(Long id);
	public List<Users> getAllUsers();
	public Users updateUsers(Long id , Users user);
	public String deleteUserById(Long id);
	
	
}
