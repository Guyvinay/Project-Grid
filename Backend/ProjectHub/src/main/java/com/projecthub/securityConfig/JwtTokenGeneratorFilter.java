package com.projecthub.securityConfig;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenGeneratorFilter extends OncePerRequestFilter {
	
	Logger log = LoggerFactory.getLogger(JwtTokenGeneratorFilter.class);
    		 
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
        if (null != authentication) {
            SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());
            String jwt = Jwts.builder()
            		.setIssuer("Ram")
            		.setSubject("JWT Token")
                    .claim("username", authentication.getName())
                    .claim("authorities", populateAuthorities(authentication.getAuthorities()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime()+ 30000000)) 
                    .signWith(key).compact();
                       System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIII");
            response.setHeader(SecurityConstants.JWT_HEADER, jwt);
 
        }

        filterChain.doFilter(request, response);	
	}
	
    private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
        
    	Set<String> authoritiesSet = new HashSet<>();
        
        for (GrantedAuthority authority : collection) {
            authoritiesSet.add(authority.getAuthority());
        }
        return String.join(",", authoritiesSet);
   
    
    }
	
//this make sure that this filter will execute only for first time when client call the api /signIn at first time
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
	
        return !request.getServletPath().equals("/projecthub/signIn");	
	}
	
	
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		
//		if(authentication!=null) {
//			log.info("Inside JWT Token Generator Filter");
//			
//			SecretKey secretKey = Keys.hmacShaKeyFor(
//					                   SecurityConstants
//					                   .JWT_KEY.getBytes()
//					                   );
//			
//			String jwtToken = Jwts.builder()
//					         .setIssuer("VINAY_KUMAR_SINGH")
//					         .setSubject("JWT_Token_Generator")
//					         .claim("username", authentication.getName())
//					         .claim("authorities", 
//					        		 PopulateAuthorities(
//					        				 authentication.getAuthorities())
//					        		 )
//					         .setIssuedAt(new Date())
//					         .setExpiration(new Date(new Date().getTime()+30000000))
//					         .signWith(secretKey)
//					         .compact();
//			response.setHeader(SecurityConstants.JWT_HEADER, jwtToken);
//		}
//		
//		filterChain.doFilter(request, response);
//		
//		
//	}
//	
//	public String PopulateAuthorities(Collection<? extends GrantedAuthority> collection) {
//		List<String> authorities = new ArrayList<>();
//		for(GrantedAuthority auth : collection) {
//			authorities.add(auth.getAuthority());
//		}
//		return String.join(",", authorities);
//	}
//	@Override
//	public boolean shouldNotFilter(HttpServletRequest request) {
//		return !request.getServletPath().equals("/projecthub/signIn");
//	}

}
