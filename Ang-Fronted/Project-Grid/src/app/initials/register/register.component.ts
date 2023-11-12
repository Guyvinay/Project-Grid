import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterUser } from 'src/app/modals/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  regiserUserData:RegisterUser = {
    name: '',
    email: '',
    password: '',
    profile_picture: ''
  }

  constructor(
    private configuration : ConfigurationService,
    private spinner: NgxSpinnerService,
    private router : Router

  ){

  }


  onSubmitRegisterUser(){
    this.spinner.show();

    this.configuration.registerUser(this.regiserUserData)
                       .subscribe(
                        (response)=>{
                          this.spinner.hide();
                          console.log(response);
        
                          Swal.fire({
                            icon: 'success', 
                            title: 'Registration Successl!',
                            text: 'Successfully Registered',
                            showConfirmButton: false, 
                            timer: 1500,
                          });
                          setTimeout(() => {
                            this.router.navigate(['login']);
                          }, 2000);
                        },
                        (error)=>{
                          this.spinner.hide();
                          console.log(error);
                          Swal.fire({
                            icon: 'error',
                            title: 'Registration Failed!',
                            text: `${!error.error.message?'Backend Connection Error':error.error.message}`,
                            showConfirmButton: false,
                            timer: 1500, 
                          });
                        }
                       );
  }


}
