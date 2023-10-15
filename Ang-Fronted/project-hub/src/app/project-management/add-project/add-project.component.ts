import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Project, Projects } from 'src/app/interfaces/projects';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Users } from 'src/app/interfaces/users';
import { UserService } from 'src/app/services/user.service';
import { UserDetailsService } from 'src/app/user-details.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  availableUsers:Users[] = [];
  currentUserDetails!:ResponseUsers;
  responseUsers !: ResponseUsers;
  users !: Users[];


  projectToBeCreated : Projects = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_logo: '',
    toAddUsers: []
  };

  constructor(
    private http : HttpClient,
    private userDetailsSer : UserDetailsService
  ){}


  ngOnInit(): void {
   
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData)
    if(storedUserData){
      this.responseUsers=JSON.parse(storedUserData);
      // console.log(this.userData.jwt_token)
    }else {
      this.responseUsers=this.userDetailsSer.getUserDetails();
      // console.log(this.userData)
    }

    this.userDetailsSer.getAllUsers(this.responseUsers.jwt_token).subscribe(
      users => {
          this.availableUsers = users;
          console.log(users);
      }
    )

 
      

    
  }

  saveProject(){
    console.log(this.projectToBeCreated)
    this.http.post(
      // 'http://localhost:8888/projecthub/projects/register',
      'https://project-grid-production.up.railway.app/projecthub/projects/register',
      this.projectToBeCreated
    )
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }


  addUser(user : Users){
    this.projectToBeCreated.toAddUsers.push(user.email)
  }
  removeUser(index : number){
    this.projectToBeCreated.toAddUsers.splice(index,1)
  }


  logOutUser(){

  }
  showProjectSection(){
    
  }


}
