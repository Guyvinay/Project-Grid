package com.projecthub.service;

import java.util.List;

import com.projecthub.model.Profile;

public interface ProfileService {

	public Profile saveProfile(Profile profile);
	public Profile getProfileById(Long id);
	public List<Profile> getAllProfile();
	public Profile updateProfile(Long id , Profile profile);
	public String deleteProfileById(Long id);
	
}
