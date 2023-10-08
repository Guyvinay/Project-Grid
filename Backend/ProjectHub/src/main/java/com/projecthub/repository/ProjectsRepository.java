package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Projects;

public interface ProjectsRepository extends  JpaRepository<Projects, Long> {

}
