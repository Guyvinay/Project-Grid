package com.projecthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.projecthub.model.Profile;
import com.projecthub.service.ProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/projecthub")
@CrossOrigin(value = "*")
public class ProfileController {

	@Autowired
	private ProfileService profileService;
	
	@PostMapping(value = "/registerAdmin")
	public ResponseEntity<Profile> saveProfile( @Valid @RequestBody Profile profile){
		if(profile==null)
			throw new EntryNotFoundException("Profile cannot be null, Value must be passed! ");
		return new ResponseEntity<Profile>(profileService.saveProfile(profile),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/profiles/{id}")
	public ResponseEntity<Profile> getProfileById( @PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		
		return new ResponseEntity<Profile>(
				profileService.getProfileById(id),HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "/profiles")
	public ResponseEntity<List<Profile>> getAllProfile(){
		
		return  new ResponseEntity<List<Profile>>(
				profileService.getAllProfile(),HttpStatus.ACCEPTED); 
	}

	@PutMapping(value = "/updateProfile/{id}")
	public ResponseEntity<Profile> updateProfile(
			@PathVariable("id") Long id,@RequestBody Profile profile) {
		
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		if(profile==null)
			throw new EntryNotFoundException("Profile cannot be null, Value must be passed! ");
		return new ResponseEntity<Profile>(
				profileService.updateProfile(id,profile),HttpStatus.ACCEPTED);
	}

	@DeleteMapping(value = "deleteProfile/{id}")
	public ResponseEntity<String> deleteProfileById(@PathVariable("id") Long id) {
		if(id==null)
			throw new EntryNotFoundException(
					"Id cannot be null, Id must be passed! ");
		
		return new ResponseEntity<String>(
				profileService.deleteProfileById(id),HttpStatus.ACCEPTED);
	}
//	@GetMapping(value = "/adminSignIn")
//	public String adminSignInUsingbasicAuth(Authentication authentication ) {
////		System.out.println(authentication);
//		if(authentication.getName()!=null)
//			return authentication.getName() +"  Successfully Logged in..";
//		return " Login Failed ...";
//		
//	}
	
}
