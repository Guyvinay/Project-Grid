package com.projecthub.comms;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CommsWebSocketHandler extends TextWebSocketHandler {

	private static final Map<String, List<WebSocketSession>> chatSessions = new HashMap<>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//		System.out.println(session);
		String userEmail = extractEmailFromWebSocketSession(session);
		System.out.println(userEmail);
		
		chatSessions.computeIfAbsent(
				userEmail, 
				val -> new ArrayList<>());
		
		chatSessions.get(userEmail).add(session);
//		System.out.println(chatSessions);
	}


	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// TODO Auto-generated method stub
		String userEmail = extractEmailFromWebSocketSession(session);
		String messagePayload = message.getPayload();
		System.out.println(messagePayload);
		ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(messagePayload);
        broadcastMessageToReciever(userEmail, messagePayload,session);
	}
	
	private void broadcastMessageToReciever(String userEmail, String message, WebSocketSession currentSession){
		
		List<WebSocketSession> currentActiveSessions = chatSessions.get(userEmail);
		
		if(currentActiveSessions!=null) {
			
			for(WebSocketSession activeSession : currentActiveSessions) {
				if(
				   activeSession.isOpen() && 
				   !(currentSession.getId().equals(activeSession.getId()))
						) {
					try {
						activeSession.sendMessage(new TextMessage(message));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		// TODO Auto-generated method stub
		String userEmail = extractEmailFromWebSocketSession(session);
//		chatSessions.get(userEmail).remove(session);
		chatSessions.remove(userEmail);
//		System.out.println(chatSessions);
	}
	
	private String extractEmailFromWebSocketSession(WebSocketSession session) {
		String uri = session.getUri().toString();
		int lastIndexOf = uri.lastIndexOf("/");
		String userEmail = uri.substring(lastIndexOf+1);
//		System.out.println(userEmail);
		return userEmail;
	}


}
