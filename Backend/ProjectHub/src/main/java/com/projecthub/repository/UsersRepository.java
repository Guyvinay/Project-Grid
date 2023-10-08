package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Users;

public interface UsersRepository extends  JpaRepository<Users, Long> {

}
