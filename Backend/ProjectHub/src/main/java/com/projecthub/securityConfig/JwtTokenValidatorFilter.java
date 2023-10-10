package com.projecthub.securityConfig;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidatorFilter extends OncePerRequestFilter {

	Logger log = LoggerFactory.getLogger(JwtTokenGeneratorFilter.class);

	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
            
		String jwtToken = request.getHeader(SecurityConstants.JWT_HEADER);
		
		if(jwtToken!=null) {
			
			try {
				
				 jwtToken = jwtToken.substring(7);
				
				SecretKey secretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());
				
				Claims claims = Jwts
						.parserBuilder()
						.setSigningKey(secretKey)
						.build()
						.parseClaimsJws(jwtToken)
						.getBody();
				
				String username = String.valueOf(claims.get("username"));
				String authorities = (String)claims.get("authorities");
				List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
				Authentication authentication = new UsernamePasswordAuthenticationToken(username,null, authorityList);
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
			}catch (Exception e) {
				throw new BadCredentialsException("Invalid Token received..");
			}
			
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		return request.getServletPath().equals("/projecthub/signIn");
	}

	
	

}
