import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/user-details.service';
import { Users } from 'src/app/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  responseUserData:Users={
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

  baseLoginUrl :string = 'http://localhost:8888/projecthub/signIn';

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
        Swal.fire('Ewwww...', 'Login Failed... PLease Go to Hell... And Enter Correct Credentials from there....', 'error');
        console.log(error);
      }
    )

  }
  routeToRegister(){
    this.router.navigate(['/registration']);
  }

}
