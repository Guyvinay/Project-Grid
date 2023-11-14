import { Component, OnInit } from '@angular/core';
import { CreateTeam } from '../modals/team';
import { ResponseUser, User } from '../modals/user';
import { TeamsService } from '../services/teams.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  
  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  
  availableUsers: User[] = [];
  
  teamToBeCreated:CreateTeam = {
    name: '',
    usersToBeAdded: []
  }
  constructor(
    private teamService : TeamsService,
    private userDetailsService : UserDetailsService
  ){}
  
  ngOnInit(): void {
    const currentStoredUserdata = localStorage.getItem("loggedInUserData");

    if (currentStoredUserdata) {
      this.currentLoggedInUser = JSON.parse(currentStoredUserdata);
    } else {
      this.currentLoggedInUser = this.userDetailsService.getCurrentLoggedInUser();
    };
    this.userDetailsService.getAllUsers(this.currentLoggedInUser.jwt_token)
      .subscribe(
        (response) => {
          this.availableUsers = response;
          console.log(this.availableUsers);
        },
        (error) => {
          console.log(error);
        });

  }
  createTeam(){
    // console.log(this.teamToBeCreated);
    this.teamService.createTeam(this.teamToBeCreated,this.currentLoggedInUser.jwt_token)
                    .subscribe(
                      (response)=>{
                        console.log(response);
                      },
                      (error)=>{
                        console.log(error);
                      }
                    );
  }
  addUserToTeam(user:User){
    this.teamToBeCreated.usersToBeAdded.push(user.email);
  }
  removeUserFromTeam(index:number){
    this.teamToBeCreated.usersToBeAdded.splice(index,1);
  }

}
