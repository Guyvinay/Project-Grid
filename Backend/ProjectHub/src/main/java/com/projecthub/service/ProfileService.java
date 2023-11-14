package com.projecthub.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;

import com.projecthub.model.Profile;

public interface ProfileService {

	public Profile saveProfile(Profile profile);
	public Profile getProfileById(Long id);
	public List<Profile> getAllProfile();
	public Profile updateProfile(Long id , Profile profile);
	public String deleteProfileById(Long id);
	public Map<String, Object> generateJwtToken(String username, String password,
			Collection<? extends GrantedAuthority> authorities);
}
