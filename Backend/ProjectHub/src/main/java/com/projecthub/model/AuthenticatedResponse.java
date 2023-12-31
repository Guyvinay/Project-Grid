package com.projecthub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class AuthenticatedResponse {

	private Long profile_id;
	private String email;
	private String name;
	private String profile_picture;
	private String jwt_token;
	private String role;
	
}
