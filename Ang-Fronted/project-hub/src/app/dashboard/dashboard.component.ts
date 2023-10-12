import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserDetailsService } from '../user-details.service';
import { Users } from '../users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData !: Users;
  
  constructor(
    private userDetailsService : UserDetailsService
  ){  
  }

  ngOnInit(): void {
    initFlowbite();

    const storedUserData = localStorage.getItem('userData')

    if(storedUserData){
      this.userData=JSON.parse(storedUserData);
    }else if(this.userDetailsService.getUserDetails()) {
      this.userData=this.userDetailsService.getUserDetails();
    }else{
      this.userData.name='Your name goes here'
      this.userData.email='Your email goes here'
    }
      
  }

  logOutUser(){

    this.userDetailsService.clearUserData();

    localStorage.removeItem('userData');
  }

 


  

}
