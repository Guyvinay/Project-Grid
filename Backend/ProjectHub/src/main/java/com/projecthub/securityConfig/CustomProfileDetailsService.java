package com.projecthub.securityConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projecthub.model.Profile;
import com.projecthub.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomProfileDetailsService implements UserDetailsService {

	@Autowired
	private ProfileRepository profileRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<Profile> optional = profileRepository.findByEmail(username);
		
		if(optional.isEmpty()) {
			log.info("Inside Custom UserDetails Profile not Varified");
			throw new UsernameNotFoundException("User not found with the Email: "+username);
		}else {
			Profile profile = optional.get();
			List<GrantedAuthority> grantedAuths = new ArrayList<>();
			grantedAuths.add(new SimpleGrantedAuthority(profile.getRole()));
			log.info("Inside Custome UserDetailsService Profile Varified");
			return new User(profile.getEmail(),profile.getPassword(),grantedAuths);
		}
	}

}
