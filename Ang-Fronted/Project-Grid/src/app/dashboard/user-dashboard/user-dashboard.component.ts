import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUser } from 'src/app/modals/user';
import { UserDetailsService } from 'src/app/services/user-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  ngOnInit(): void {

    const currentStoredUserdata = localStorage.getItem("loggedInUserProfileData");
    if(currentStoredUserdata){
      this.currentLoggedInUser = JSON.parse(currentStoredUserdata);
      this.userDetailsService.setCurrentLoggedInUser(this.currentLoggedInUser);
    }else{
      this.currentLoggedInUser = this.userDetailsService.getCurrentLoggedInUser();
    };

  }
  constructor(
    private userDetailsService : UserDetailsService,
    private router : Router
  ){}

  logoutUser(){
    localStorage.removeItem("loggedInUserProfileData");
    setTimeout(()=>{
      this.router.navigate(['/inits']);
    },2000);
    Swal.fire({
      icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
      title: 'Successfully Logged Out',
      text: "You Have Been Successfully Logged Out",
      showConfirmButton: false, // Automatically close the alert after a short delay
      timer: 2000, // Adjust the duration (in milliseconds) for the alert to disappear
    });
    setTimeout(()=>{
      window.location.reload();
    },2000);
  }

}
