package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
