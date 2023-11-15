package com.projecthub.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;

import com.projecthub.model.Users;

public interface UsersService {

	public Users saveUsers(Users user);
	public Users saveManagers(Users user);
	public Users getUserById(Long id);
	public Users getUserByEmail(String email);
	public List<Users> getAllUsers();
	public List<Users> getAllUsersByRoleUser();
	public List<Users> getAllUsersByRoleManager();
	public Users updateUsers(Long id , Users user);
	public String deleteUserById(Long id);
	public Map<String, Object> generateJwtToken(String username, String password,
			Collection<? extends GrantedAuthority> authorities);
	
}
