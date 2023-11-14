import { Component, OnInit } from '@angular/core';
import { CreatedProject } from '../modals/project';
import { ResponseUser, User } from '../modals/user';
import { UserDetailsService } from '../services/user-details.service';
import { Team } from '../modals/team';
import { TeamsService } from '../services/teams.service';
import { ProjectsService } from '../services/projects.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  
  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  availableUsers: User[] = [];
  availableProfiles : User[] = [];
  availableTeams: Team[] = [];
  
  projectToBeCreated:CreatedProject={
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_logo: '',
    managerEmail: '',
    teamsId: []
  }
  constructor(
    private userDetailsService : UserDetailsService,
    private teamsService : TeamsService,
    private projectService : ProjectsService,
    private spinner: NgxSpinnerService,
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

        this.userDetailsService.getAllProfiiles(this.currentLoggedInUser.jwt_token).subscribe(
          (resp)=>{
            this.availableProfiles = resp;
            console.log("Available Managers");
            console.log(this.availableProfiles);
          },
          (error)=>{
            console.log(error);
          }
        );

    this.teamsService.getAllTeams(this.currentLoggedInUser.jwt_token)
         .subscribe(
           (response)=>{
             this.availableTeams = response;
             console.log("Available Teams");
             console.log(this.availableTeams);
           },
           (error)=>{
             console.log(error);
           }
         );

  } 
  
  createProject(){
    this.spinner.show();
    this.projectService.createProject(this.projectToBeCreated,this.currentLoggedInUser.jwt_token)
                       .subscribe((response)=>{
                        console.log(response);
                        this.spinner.hide();
                       },
                       (error)=>{console.log(error);
                        this.spinner.show();
                       });
  }

  addManagerToProject( user : User ){
    this.projectToBeCreated.managerEmail=user.email;
  }
  addTeamsToProject(team:Team){
    this.projectToBeCreated.teamsId.push(team.id);
  }
  removeTeamFromProject(index:number){
    this.projectToBeCreated.teamsId.splice(index, 1);
  }

}
