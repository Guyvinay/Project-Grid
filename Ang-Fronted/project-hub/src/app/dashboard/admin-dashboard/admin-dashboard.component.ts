import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Teams } from 'src/app/interfaces/teams';
import { Users } from 'src/app/interfaces/users';
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



  availableUsers : Users[] = [];
  loggedInUser !: ResponseUsers;


  constructor(
    private userDetailsService : UserDetailsService,
    private http : HttpClient
  ){}


  ngOnInit(): void {
    const storedUserData = localStorage.getItem('loggedInUserData');
    // console.log(storedUserData);
    if(storedUserData){
      this.loggedInUser = JSON.parse(storedUserData);
    }else{
      this.loggedInUser = this.userDetailsService.getUserDetails();
    }


    this.userDetailsService.getAllUsers(this.loggedInUser.jwt_token).subscribe(
      (resp)=>{
        this.availableUsers = resp;
        console.log(this.availableUsers);
      },
      (error)=>{

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
      'http://localhost:8888/projectGrid/createTasks',
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
    "http://localhost:8888/projectGrid/createTeams",
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
    console.log("selected User")
    console.log(user);
    // console.log(this.availableUsers);
    this.teamToBeCreated.usersToBeAdded.push(user.email);
  }
  removeUserFromTeam(index : number){
    this.teamToBeCreated.usersToBeAdded.splice(index,1);
  }


}
