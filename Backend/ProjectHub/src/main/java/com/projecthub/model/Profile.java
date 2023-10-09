package com.projecthub.model;



//@Entity
//@Getter
//@Setter
public class Profile {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long profile_id;
	private String email;
	private String password;
	private String role;
	
	
	
	public Profile(String email, String password, String role) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public Profile() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
