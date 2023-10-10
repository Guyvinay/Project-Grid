//package com.projecthub.securityConfig;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.projecthub.exception.InvalidUserException;
//import com.projecthub.exception.UnauthorizedAccessException;
//import com.projecthub.model.Users;
//import com.projecthub.repository.UsersRepository;
//@Component
//public class CustomAuthenticationProvider implements AuthenticationProvider {
//
//	@Autowired
//	private UsersRepository usersRepository;
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	@Override
//	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//		
//		String username = authentication.getName();
//		String password = authentication.getCredentials().toString();
//		
//		Optional<Users> optional = usersRepository.findByEmail(username);
//		System.out.println(optional.get().getName());
//		if(optional.isPresent()) {
//			Users user = optional.get();
//			
//			if(passwordEncoder.matches(password, user.getPassword())) {
//				List<GrantedAuthority> auths = new ArrayList<>();
//				auths.add(new SimpleGrantedAuthority(user.getRole()));
//				return new UsernamePasswordAuthenticationToken(username, password, auths);
//			}else
//				throw new UnauthorizedAccessException("Wrong Credentials...");	
//		}else 
//			throw new InvalidUserException("User with Not Found");
//	}
//
//	@Override
//	public boolean supports(Class<?> authentication) {
//		return UsernamePasswordAuthenticationToken.class
//				.isAssignableFrom(authentication);
//	}
//
//}
