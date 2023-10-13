import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{

  responseUsers !: ResponseUsers;


  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {
    initFlowbite();

    const loggedInUserData = localStorage.getItem('loggedInUserData')
    if(loggedInUserData){
      this.responseUsers=JSON.parse(loggedInUserData);
    }else {
      this.responseUsers=this.userService.getUserDetails();
      
    }
      
  }

  logOutUser(){
    this.userService.clearUserData();

    localStorage.removeItem('userData');
  }



}
