import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/user-details.service';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  responseUserData:ResponseUsers={
    profile_id: '',
    email: '',
    name: '',
    profile_picture: '',
    jwt_token: ''
  }

  userCreds = {
    username:'',
    password:'',
  }

  constructor( 
    private http : HttpClient,
    private router : Router,
    private userDetailsService : UserDetailsService
  ){}

  loginUser(){
    this.userDetailsService.userLogin(this.userCreds.username,this.userCreds.password)
    .subscribe(
      (response)=>{
        
        this.responseUserData = response;
        console.log(this.responseUserData);
        this.userDetailsService.setUserDetails(this.responseUserData);

        localStorage.setItem('userData',JSON.stringify(this.responseUserData));

        Swal.fire(`Hello ${this.responseUserData.name}`,"You have Successfully Logged-in...",'success');
        setTimeout(()=>{
          this.router.navigate(['/dashboard']);
        },2000);
      },
      (error)=>{
        Swal.fire('Ohhhhh...', 'Login Failed... PLease Breath and Try Entering Correct Credentials Again... ', 'error');
        console.log(error);
      }
    )

  }
  routeToRegister(){
    this.router.navigate(['/registration']);
  }

}
