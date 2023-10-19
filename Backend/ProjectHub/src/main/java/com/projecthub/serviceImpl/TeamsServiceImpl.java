package com.projecthub.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthub.model.Teams;
import com.projecthub.model.Users;
import com.projecthub.repository.TeamsRepository;
import com.projecthub.repository.UsersRepository;
import com.projecthub.service.TeamsService;

@Service
public class TeamsServiceImpl implements TeamsService {

	
	@Autowired
	private UsersRepository usersRepository;
	
	@Autowired
	private TeamsRepository teamsRepository;
	
	
	@Override
	public Teams saveTeams(Teams team) {
		
		
		List<String> list = team.getUsersToBeAdded();
		
		for(String userEmail : list) {
			
			Users user = usersRepository.findByEmail(userEmail).get();
			team.getUsers().add(user);
			user.getTeams().add(team);
		}
		
		return teamsRepository.save(team);
	}

	@Override
	public Teams getTeamById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Teams> getAllTeams() {
		List<Teams> list = teamsRepository.findAll();
		return list;
	}

	@Override
	public Teams updateTeams(Long id, Teams team) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Teams deleteTeamById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
