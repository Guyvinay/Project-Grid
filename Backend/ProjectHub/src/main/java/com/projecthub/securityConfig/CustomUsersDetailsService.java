package com.projecthub.securityConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projecthub.exception.InvalidUserException;
import com.projecthub.model.Users;
import com.projecthub.repository.UsersRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomUsersDetailsService implements UserDetailsService {

	@Autowired
	private UsersRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Users> optional = repository.findByEmail(username);
		if(optional.isEmpty()) {
			System.out.println("Inside Custome UserDetails not Varified");
			throw new UsernameNotFoundException("User not found with the Email: "+username);
		}
		else{
			Users user = optional.get();
			List<GrantedAuthority> grantedAuths = new ArrayList<>();
			grantedAuths.add(new SimpleGrantedAuthority(user.getRole()));
			log.info("Inside Custome UserDetails Varified");
			return new User(user.getEmail(),user.getPassword(),grantedAuths);
		}
	}
}
