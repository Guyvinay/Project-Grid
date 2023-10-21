import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectModel, Projects } from 'src/app/interfaces/projects';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Team, Teams } from 'src/app/interfaces/teams';
import { Users } from 'src/app/interfaces/users';
import { AppConfig } from 'src/app/services/config.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserDetailsService } from 'src/app/user-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  taskToBeCreated = {
    title:'',
    description:'',
    due_date : '',
    priority : '',
    status: '',
    userEmail: ''
  }

  teamToBeCreated : Teams = {
    name : '',
    usersToBeAdded : []
  }

  projectToBeCreated : ProjectModel = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_logo: '',
    managerEmail: '',
    teamsId: []
  };



  loggedInUser !: ResponseUsers;
  availableUsers : Users[] = [];
  availableProfiles : Users[] = [];
  availableTeams : Team[] = [];
  availableProjects !: Project[];


  constructor(
    private userDetailsService : UserDetailsService,
    private http : HttpClient,
    private teamsService : TeamService,
    private projectService : ProjectService
  ){}


  ngOnInit(): void {

    const storedUserData = localStorage.getItem('loggedInUserData');
    // console.log(storedUserData);
    if(storedUserData){
      this.loggedInUser = JSON.parse(storedUserData);
    }else{
      this.loggedInUser = this.userDetailsService.getUserDetails();
    }

// getting all users
    this.userDetailsService.getAllUsers(this.loggedInUser.jwt_token).subscribe(
      (resp)=>{
        this.availableUsers = resp;
        console.log("Available Users");
        console.log(this.availableUsers);
      },
      (error)=>{
        console.log(error);
      }
    );
// getting all Profiles
    this.userDetailsService.getAllProfiiles(this.loggedInUser.jwt_token).subscribe(
      (resp)=>{
        this.availableProfiles = resp;
        console.log("Available Managers");
        console.log(this.availableProfiles);
      },
      (error)=>{
        console.log(error);
      }
    );


    // getting all tasks 

    this.teamsService.getAllTeams(this.loggedInUser.jwt_token)
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


    // getting All Projects 

    this.projectService.getAllProjects(this.loggedInUser.jwt_token)
    .subscribe(
      (response)=>{
        this.availableProjects = response;
        console.log("Available Projects");
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )



  }



  createTask(){
    // console.log(this.taskToBeCreated);
   const  token  =  this.loggedInUser.jwt_token;
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });
    this.http.post(
      AppConfig.baseUrl+'/projectGrid/createTasks',
      this.taskToBeCreated,
      {headers}
    )
    .subscribe(
      (response)=>{
        console.log("Response From Server: ")
        console.log(response);
        Swal.fire(`${this.taskToBeCreated.title} Created`,`And Successfully Assigned to ${this.taskToBeCreated.userEmail}`,'success');

      },
      (error)=>{
        console.log(error);
        Swal.fire(`${this.taskToBeCreated.title} Creation Failed`,"Task Creation Failed...",'error');
      }
    );

  }


  addUser(user:Users){
    this.taskToBeCreated.userEmail = user.email;
  }


  createTeam(){

    const  token  =  this.loggedInUser.jwt_token;
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });


  this.http.post(
    AppConfig.baseUrl+"/projectGrid/createTeams",
    this.teamToBeCreated,
    {headers}
  )
  .subscribe(
    (response)=>{
      console.log(response);
      Swal.fire(`Wooohh Team Created`,`Team ${this.teamToBeCreated.name} Successfully Created And Assigned to Users`,'success');
    },
    (error)=>{
      console.log(error);
      Swal.fire(`Opps`,`Team  ${this.taskToBeCreated.title} creation Failed `,'error');

    }
  )

  }
  
  addUserToTeam(user : Users){
    // console.log("selected User")
    // console.log(user);
    // console.log(this.availableUsers);
    this.teamToBeCreated.usersToBeAdded.push(user.email);
  }
  removeUserFromTeam(index : number){
    this.teamToBeCreated.usersToBeAdded.splice(index,1);
  }




  createProject(){

    const  token  =  this.loggedInUser.jwt_token;
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });

  console.log(this.projectToBeCreated);

  this.http.post(
    AppConfig.baseUrl+"/projecthub/projects/register",
    this.projectToBeCreated,
    {headers}
  )
  .subscribe(
    (response)=>{
      console.log("From Project Resonse")
      console.log(response);
      Swal.fire(`Wooohh Project Created`,`Project ${this.projectToBeCreated.name} Successfully Created And Assigned to Teams`,'success');
    },
    (error)=>{
      console.log(error);
      Swal.fire(`Opps`,`Project  ${this.projectToBeCreated.name} creation Failed `,'error');

    }
  )


  }



  addManagerToProject(manager: Users){
    this.projectToBeCreated.managerEmail = manager.email;
  }

  addTeamsToProject(team : Team){
    this.projectToBeCreated.teamsId.push(team.id);
  }

  removeTeamFromProject(index : number){
    this.projectToBeCreated.teamsId.splice(index,1);
  }






}
