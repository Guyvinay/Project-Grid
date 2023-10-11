package com.projecthub.securityConfig;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenHandling {

	public String generateToken(UserDetails userDetails) {
		Map<String,Object> claims = new HashMap<>();
        SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());

		String token = Jwts
				        .builder()
				        .setClaims(claims)
						.setSubject(userDetails.getUsername())
						.setIssuedAt(new Date(System.currentTimeMillis()))
						.setExpiration(new Date(System.currentTimeMillis()+ 1000*60*24))
						.signWith(key,SignatureAlgorithm.HS256)
						.compact();
		
		return token;
	}
	
	
	
	
	
}
