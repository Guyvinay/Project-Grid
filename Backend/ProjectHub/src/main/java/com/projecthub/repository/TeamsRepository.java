package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Teams;

public interface TeamsRepository extends  JpaRepository<Teams, Long> {

}
