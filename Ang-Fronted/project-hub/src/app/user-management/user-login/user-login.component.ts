import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/user-details.service';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

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
    jwt_token: '',
    role : ''
  }

  userCreds = {
    username:'',
    password:'',
  }

  constructor( 
    private http : HttpClient,
    private router : Router,
    private userDetailsService : UserDetailsService,
    private adminService : AdminService,
    private managerService : ManagerService,
    private userService : UserService
  ){}

  loginUser(){
    this.userDetailsService.userLogin(this.userCreds.username,this.userCreds.password)
    .subscribe(
      (response)=>{
        
        this.responseUserData = response;

        console.log(this.responseUserData.role);

        if( this.responseUserData.role == 'ROLE_ADMIN' ){
          this.adminService.setAdminDetails(this.responseUserData);
          localStorage.setItem('loggedInUserData',JSON.stringify(this.responseUserData));
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          },2000);
          console.log('this is admin')
        }else if (this.responseUserData.role == 'ROLE_USER' ){
          this.userService.setUserDetails(this.responseUserData);
          localStorage.setItem('loggedInUserData',JSON.stringify(this.responseUserData));
          setTimeout(()=>{
            this.router.navigate(['/userDashboard']);
          },2000);
          console.log('this  is USER');
        }else if (this.responseUserData.role == 'ROLE_MANAGER') {
          this.managerService.setManagerDetails(this.responseUserData);
          localStorage.setItem('loggedInUserData',JSON.stringify(this.responseUserData));
          setTimeout(()=>{
            this.router.navigate(['/managerDashboard']);
          },2000);
          console.log('This is manager')
        }else{
          console.log('Role Not Found')
        }


        this.userDetailsService.setUserDetails(this.responseUserData);

        localStorage.setItem('userData',JSON.stringify(this.responseUserData));

        Swal.fire(`Hello ${this.responseUserData.name}`,"You have Successfully Logged-in...",'success');
        setTimeout(()=>{
          // this.router.navigate(['/dashboard']);
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
