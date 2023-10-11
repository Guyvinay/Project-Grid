package com.projecthub.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.exception.EntryNotFoundException;
import com.projecthub.model.Profile;
import com.projecthub.repository.ProfileRepository;
import com.projecthub.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private ProfileRepository profileRepository;
	
	
	@Override
	public Profile saveProfile(Profile profile) {
		profile.setRole("ROLE_"+profile.getRole().toUpperCase());
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
		List<Profile> list = profileRepository.findAll();
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

}
