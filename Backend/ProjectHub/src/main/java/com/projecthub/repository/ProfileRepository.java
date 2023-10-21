package com.projecthub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projecthub.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

	public Optional<Profile> findByEmail(String email);
	@Query("SELECT p FROM Profile p WHERE p.role='ROLE_MANAGER'")
	public Optional<List<Profile>> findAllProfilesByRole();
	
}
