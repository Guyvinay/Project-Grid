package com.projecthub.securityConfig;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
//@Slf4j
public class SecurityConfiguration {

	@Bean
	public SecurityFilterChain securityFilterChain(
			HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
		    .sessionManagement(sessionManagement->
	                 sessionManagement
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			         )
		   .cors(cors->{
				cors.configurationSource(new CorsConfigurationSource() {
					@Override
					public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
						CorsConfiguration cfg = new CorsConfiguration();
						cfg.setAllowedOriginPatterns(Collections.singletonList("*"));
						cfg.setAllowedMethods(Collections.singletonList("*"));
						cfg.setAllowCredentials(true);
						cfg.setAllowedHeaders(Collections.singletonList("*"));
						cfg.setExposedHeaders(Arrays.asList("Authorization"));
						return cfg;
					}
				});
			})
		   .authorizeHttpRequests(auth->{
			   auth
			   .requestMatchers(HttpMethod.POST,"/projecthub/register").permitAll()
			   .requestMatchers(HttpMethod.POST,"/projecthub/signIn").permitAll()
			   .requestMatchers(HttpMethod.POST,"/projecthub/registerProfile").permitAll()
			   .requestMatchers("/swagger-ui*/**","/v3/api-docs/**").permitAll()
			       .anyRequest()
			       .authenticated();
		   })
		   .csrf(csrf->csrf.disable())
		   .addFilterAfter(new JwtTokenGeneratorFilter(), BasicAuthenticationFilter.class)
		   .addFilterBefore(new JwtTokenValidatorFilter(), BasicAuthenticationFilter.class)
		   .addFilterBefore(new JwtTokenGeneratorFilter(), AuthorizationFilter.class)
		   .formLogin(Customizer.withDefaults())
		   .httpBasic(Customizer.withDefaults())
		;
		return httpSecurity.build();
	}
	
	@Bean
    public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration
				.getAuthenticationManager();
	}
	
}
