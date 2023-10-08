package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Tasks;

public interface TasksRepository extends  JpaRepository<Tasks, Long> {

}
