package com.projecthub.serviceImpl;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.exception.UnauthorizedAccessException;
import com.projecthub.model.AuthenticatedResponse;
import com.projecthub.model.Users;
import com.projecthub.repository.UsersRepository;
import com.projecthub.securityConfig.TokenHandling;
import com.projecthub.service.UsersService;

@Service
public class UserServiceImpl implements UsersService {

	@Autowired
	private UsersRepository usersRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public Users saveUsers(Users user) {
		user.setRole("ROLE_USER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return usersRepository.save(user);
	}
	@Override
	public Users saveManagers(Users user) {
		user.setRole("ROLE_MANAGER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
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
	public List<Users> getAllUsersByRoleManager() {
		List<Users> list = usersRepository.findAllUsersByRoleManager().get();
		return list;
	}
	@Override
	public List<Users> getAllUsersByRoleUser() {
		List<Users> list = usersRepository.findAllUsersByRoleUser().get();
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


	@Override
	public AuthenticatedResponse generateJwtToken(String username, String password,
			Collection<? extends GrantedAuthority> authorities) {
		
		Optional<Users> optional = usersRepository.findByEmail(username);
		
		if(optional.isEmpty()) {
			throw new UnauthorizedAccessException("User not registered! ");
		}
		else {
			Users user = optional.get();
			String userEmail = user.getEmail();
             TokenHandling tokenHandling = new TokenHandling();
		     String token = tokenHandling.generateToken(
				     new User(username,password,authorities)
				     );
		     String name = user.getName();
		     Long profile_id = user.getProfile_id();
		     String profile_picture = user.getProfile_picture();
		     String role = user.getRole();
		     
		     
		     return new AuthenticatedResponse(profile_id, userEmail, name,profile_picture,token,role);
		}
	}

}
