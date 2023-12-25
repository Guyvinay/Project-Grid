package com.projecthub.comms;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.projecthub.model.Users;
import com.projecthub.repository.UsersRepository;

import lombok.AllArgsConstructor;
@AllArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor  {

	private UsersRepository usersRepository;
	
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		String uri = request.getURI().toString();
		int lastIndexOf = uri.lastIndexOf("/");
		String userEmail = uri.substring(lastIndexOf+1);
		System.out.println(userEmail);
		Users user = usersRepository.findByEmail(userEmail).orElse(null);
		return user!=null;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			@Nullable Exception exception) {}

}
