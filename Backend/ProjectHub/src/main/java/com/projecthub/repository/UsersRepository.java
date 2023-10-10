package com.projecthub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Users;

public interface UsersRepository extends  JpaRepository<Users, Long> {

	public Optional<Users> findByEmail(String email);
	
}
