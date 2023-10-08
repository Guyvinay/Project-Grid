package com.projecthub.service;

import java.util.List;

import com.projecthub.model.Teams;

public interface TeamsService {

	public Teams saveTeams(Teams team);
	public Teams getTeamById(Long id);
	public List<Teams> getAllTeams();
	public Teams updateTeams(Long id , Teams team);
	public Teams deleteTeamById(Long id);
	
}
