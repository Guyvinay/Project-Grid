import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginCreds } from 'src/app/modals/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
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

  constructor(
    private router : Router,
    private configuration : ConfigurationService,
    private spinner: NgxSpinnerService
  ){}

  loginUser(){
    this.spinner.show();
    this.configuration.loginUser(this.loginCreds)
              .subscribe(
                (response)=>{
                  this.spinner.hide();
                  console.log(response);

                  Swal.fire({
                    icon: 'success', 
                    title: 'Login Success!',
                    text: 'Successfully Logged-in',
                    showConfirmButton: false, 
                    timer: 1500,
                  });
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
