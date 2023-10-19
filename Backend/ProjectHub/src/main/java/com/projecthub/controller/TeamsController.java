package com.projecthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthub.model.Teams;
import com.projecthub.service.TeamsService;

@RestController
@RequestMapping("/projectGrid")
public class TeamsController {

	@Autowired
	private TeamsService teamsService;
	
	@PostMapping(value = "/createTeams")
	public ResponseEntity<Teams> createTeam(@RequestBody Teams team){
		return new ResponseEntity<Teams>(teamsService.saveTeams(team),HttpStatus.ACCEPTED);
	}
	@GetMapping(value = "/getAllTeams")
	public ResponseEntity<List<Teams>> getAllTeams(){
		return new ResponseEntity<List<Teams>>(teamsService.getAllTeams(),HttpStatus.ACCEPTED);
	}
}
