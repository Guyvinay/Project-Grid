import { Component, OnInit } from '@angular/core';
import { CreateTeam } from '../modals/team';
import { ResponseUser, User } from '../modals/user';
import { TeamsService } from '../services/teams.service';
import { UserDetailsService } from '../services/user-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

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
    private userDetailsService : UserDetailsService,
    private spinner: NgxSpinnerService,
  ){}
  
  ngOnInit(): void {
    this.spinner.show();
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
        this.spinner.hide();
  }
  createTeam(){
    // console.log(this.teamToBeCreated);
    this.spinner.show();
    this.teamService.createTeam(this.teamToBeCreated,this.currentLoggedInUser.jwt_token)
                    .subscribe(
                      (response)=>{
                        this.spinner.hide();
                        console.log(response);
                        Swal.fire({
                          icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
                          title: 'Team Created',
                          text: "You Have Successfully Created Team",
                          showConfirmButton: false, // Automatically close the alert after a short delay
                          timer: 2000, // Adjust the duration (in milliseconds) for the alert to disappear
                        });
                      },
                      (error)=>{
                        this.spinner.hide();
                        console.log(error);
                        Swal.fire({
                          icon: 'error', // Set the alert icon (success, error, warning, info, etc.)
                          title: 'Task Creation Failed',
                          text: "Task Creation Failed! Try again",
                          showConfirmButton: false, // Automatically close the alert after a short delay
                          timer: 2000, // Adjust the duration (in milliseconds) for the alert to disappear
                        });
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
