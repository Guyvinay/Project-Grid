package com.projecthub.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
import com.projecthub.model.AuthenticatedResponse;
import com.projecthub.model.LoginCreds;
import com.projecthub.model.Users;
import com.projecthub.service.UsersService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/projecthub")
@CrossOrigin(value = "*")
@Slf4j
public class UsersController {

	@Autowired
	private UsersService userService;
	

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping(value = "/register")
	public ResponseEntity<Users> saveUsers( @Valid @RequestBody Users user){
		if(user==null)
			throw new EntryNotFoundException("User cannot be null, Value must be passed! ");
		return new ResponseEntity<Users>(userService.saveUsers(user),HttpStatus.ACCEPTED);
	}
	@PostMapping(value = "/registerManager")
	public ResponseEntity<Users> saveManager( @Valid @RequestBody Users user){
		if(user==null)
			throw new EntryNotFoundException("User cannot be null, Value must be passed! ");
		return new ResponseEntity<Users>(userService.saveManagers(user),HttpStatus.ACCEPTED);
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
	
	@GetMapping(value = "/usersByRoleUser")
	public ResponseEntity<List<Users>> getAllUsersByRoleUser(){
		
		return  new ResponseEntity<List<Users>>(
				userService.getAllUsersByRoleUser(),HttpStatus.ACCEPTED); 
	}
	@GetMapping(value = "/usersByRoleManager")
	public ResponseEntity<List<Users>> getAllUsersByRoleManager(){
		
		return  new ResponseEntity<List<Users>>(
				userService.getAllUsersByRoleManager(),HttpStatus.ACCEPTED); 
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
		if(authentication.getName()!=null)
			return authentication.getName() +"  Successfully Logged in..";
		return " Login Failed ...";
		
	}
	@PostMapping(value = "/signIn")
	public ResponseEntity<AuthenticatedResponse> signInUsingUsernamePass(@RequestBody LoginCreds loginCreds) {
		System.out.println();
		Authentication authenticate = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginCreds.getUsername(), loginCreds.getPassword())
				);
//		System.out.println(authenticate);
		String username = authenticate.getName();
		String password = loginCreds.getPassword();		
		AuthenticatedResponse authenticatedResponse = userService
				                 .generateJwtToken(
				                      username,
				                      password,
				                      authenticate.getAuthorities());
				
		return new ResponseEntity<AuthenticatedResponse>(authenticatedResponse,HttpStatus.ACCEPTED);
		
	}
}
