package com.projecthub.service;

import java.util.List;

import com.projecthub.model.Notifications;

public interface NotificationsService {

	public Notifications saveNotifications(Notifications notification, Long userId);
	public Notifications getNotificationById(Long id);
	public List<Notifications> getAllNotifications();
	public Notifications updateNotifications(Long id , Notifications notification);
	public Notifications deleteNotificationById(Long id);
	
}
