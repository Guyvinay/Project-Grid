import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseUser } from 'src/app/modals/user';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  constructor(
    private userDetailsService : UserDetailsService,
    private projectService : ProjectsService
  ){
  }
  ngOnInit(): void {
    
    const currentStoredUserdata = localStorage.getItem("loggedInUserData");

    if(currentStoredUserdata){
      console.log("from admin-dashboard local storage");
      this.currentLoggedInUser = JSON.parse(currentStoredUserdata);
    }else{
      console.log("from admin-dashboard service");
      this.currentLoggedInUser = this.userDetailsService.getCurrentLoggedInUser();
    }

    console.log(this.currentLoggedInUser);


    this.projectService.getAllProjects(this.currentLoggedInUser.jwt_token)
                       .subscribe(
                        (response)=>{
                          console.log(response);
                        },
                        (error)=>{
                          console.log(error); 
                        }
                       );


  }


  

}
