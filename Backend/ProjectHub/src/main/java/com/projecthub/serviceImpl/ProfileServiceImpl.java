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
import com.projecthub.model.Profile;
import com.projecthub.model.Users;
import com.projecthub.repository.ProfileRepository;
import com.projecthub.securityConfig.TokenHandling;
import com.projecthub.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public Profile saveProfile(Profile profile) {
		profile.setRole("ROLE_MANAGER");
		profile.setPassword(passwordEncoder.encode(profile.getPassword()));
		return profileRepository.save(profile);
	}

	@Override
	public Profile getProfileById(Long id) {
		Profile profile = profileRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("Profile With ID: "+id+" not Found"));
		return profile;
	}

	@Override
	public List<Profile> getAllProfile() {
		List<Profile> list = profileRepository.findAllProfilesByRole().get();
		return list;
	}

	@Override
	public Profile updateProfile(Long id, Profile profile) {
		Profile profiles = profileRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("Profile not Found"));
		profiles.setRole(profile.getRole());
		return profiles;
	}

	@Override
	public String deleteProfileById(Long id) {
		Profile profiles = profileRepository.findById(id).orElseThrow(
				()->new EntryNotFoundException("Profile with Id: "+id+" not Found"));
		profileRepository.deleteById(id);
		return "Profile With ID:"+id+" Successfully Deleted";
	}
	
	@Override
	public AuthenticatedResponse generateJwtToken(String username, String password,
			Collection<? extends GrantedAuthority> authorities) {
		
		Optional<Profile> optional = profileRepository.findByEmail(username);
		
		if(optional.isEmpty()) {
			throw new UnauthorizedAccessException("User not registered! ");
		}
		else {
			Profile user = optional.get();
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
