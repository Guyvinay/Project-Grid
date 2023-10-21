package com.projecthub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projecthub.model.Users;

public interface UsersRepository extends  JpaRepository<Users, Long> {

	public Optional<Users> findByEmail(String email);
	@Query("SELECT p FROM Profile p WHERE p.role='ROLE_MANAGER'")
	public Optional<List<Users>> findAllUsersByRoleManager();
	
	@Query("SELECT p FROM Profile p WHERE p.role='ROLE_USER'")
	public Optional<List<Users>> findAllUsersByRoleUser();
}
