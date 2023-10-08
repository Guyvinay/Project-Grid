package com.projecthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthub.model.Notifications;

public interface NotificationsRepository extends  JpaRepository<Notifications, Long> {

}
