import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginCreds, ResponseUser } from 'src/app/modals/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginCreds: LoginCreds = {
    email: '',
    password: ''
  }

  currentLoggedInUser : ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }
  loggedInUser!:ResponseUser;

  constructor(
    private router : Router,
    private configuration : ConfigurationService,
    private spinner: NgxSpinnerService,
    private userDetailsService : UserDetailsService
  ){}

  loginUser(){
    this.spinner.show();
    this.configuration.loginUser(this.loginCreds)
              .subscribe(
                (response)=>{
                  this.spinner.hide();
                  this.currentLoggedInUser = response.data;
                  this.userDetailsService.setCurrentLoggedInUser(this.currentLoggedInUser);
                  localStorage.setItem('loggedInUserData',JSON.stringify(this.currentLoggedInUser));
                  // if(this.currentLoggedInUser.role=='')
                  Swal.fire({
                    icon: 'success', 
                    title: 'Login Success!',
                    text: 'Successfully Logged-in',
                    showConfirmButton: false, 
                    timer: 1800,
                  }); 
                  setTimeout(() => {
                    this.router.navigate(['admin-dashboard']);
                  }, 2000);
                },
                (error)=>{
                  this.spinner.hide();
                  console.log(error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Login Failed!',
                    text: `${!error.error.message?'Backend Connection Error':error.error.message}`,
                    showConfirmButton: false,
                    timer: 1500, 
                  });
                },
                ()=>{
                  this.spinner.hide();
                }
              );
    

  }

}
