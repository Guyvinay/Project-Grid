package com.projecthub.securityConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.projecthub.model.Profile;
import com.projecthub.repository.ProfileRepository;

//@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private ProfileRepository profileRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String userName = authentication.getName();
		String password = authentication.getCredentials().toString();
		
		Optional<Profile> optional = profileRepository.findByEmail(userName);
		
		if(optional.isEmpty())
			throw new BadCredentialsException("No user found with username: "+userName);
		
		Profile profile = optional.get();
		boolean matches = passwordEncoder.matches(password, profile.getPassword());
		if(matches) {
			List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
			grantedAuthorities.add(new SimpleGrantedAuthority(profile.getRole().toString()));
			return new UsernamePasswordAuthenticationToken(userName, password, grantedAuthorities);
		}
		throw new BadCredentialsException("Password went wrong!!!");
	}

	@Override
	public boolean supports(Class<?> authentication) {
		
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}

}
