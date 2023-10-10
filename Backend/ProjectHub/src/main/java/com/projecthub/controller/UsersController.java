package com.projecthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Users;
import com.projecthub.service.UsersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/projecthub")
@CrossOrigin(value = "*")
public class UsersController {

	@Autowired
	private UsersService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping(value = "/register")
	public ResponseEntity<Users> saveUsers( @Valid @RequestBody Users user){
		if(user==null)
			throw new EntryNotFoundException("User cannot be null, Value must be passed! ");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ResponseEntity<Users>(userService.saveUsers(user),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/users/{id}")
	public ResponseEntity<Users> getUserById( @PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		
		return new ResponseEntity<Users>(
				userService.getUserById(id),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/users")
	public ResponseEntity<List<Users>> getAllUsers(){
		
		return  new ResponseEntity<List<Users>>(
				userService.getAllUsers(),HttpStatus.ACCEPTED); 
	}

	@PutMapping(value = "/updateUser/{id}")
	public ResponseEntity<Users> updateUsers(
			@PathVariable("id") Long id,@RequestBody Users user) {
		
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		if(user==null)
			throw new EntryNotFoundException("User cannot be null, Value must be passed! ");
		return new ResponseEntity<Users>(
				userService.updateUsers(id,user),HttpStatus.ACCEPTED);
	}

	@DeleteMapping(value = "deleteUser/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		
		return new ResponseEntity<String>(
				userService.deleteUserById(id),HttpStatus.ACCEPTED);
	}
	@GetMapping(value = "/signIn")
	public String signInUsingbasicAuth(Authentication authentication ) {
//		System.out.println(authentication);
		if(authentication.getName()!=null)
			return authentication.getName() +"  Successfully Logged in..";
		return " Login Failed ...";
		
	}
	
}