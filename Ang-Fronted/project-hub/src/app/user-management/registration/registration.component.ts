import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppConfig } from 'src/app/services/config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  baseRegistrationUrl = AppConfig.baseUrl+'/projecthub/register'; 


  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address:'',
    profile_picture:''
  };
  constructor(
    private http: HttpClient,
    // private toastr : ToastrService,
    private router : Router,
    ) {}


  onSubmitRegisterUser(): void {
    
   const registrationData = {
    name : this.user.firstName+" "+this.user.lastName,
    email:this.user.email,
    password:this.user.password,
    profile_picture:this.user.profile_picture
   }

   this.http.post(
    this.baseRegistrationUrl ,
    registrationData
   )
   .subscribe(
    (response) => {
      Swal.fire('Congratulations', 'You have Successfully registered. Now You can Login... ', 'success');

      console.log('Registration Successfull',response);

      setTimeout(()=>{
        this.router.navigate(['/login']);
      },2000);

    },
    (error)=>{
      Swal.fire('Oops...', 'Registration Failed. PLease Submit the Details Again to Register... ', 'error');
      console.log('Registration Failed: ', error)
    }
   )
  }
}