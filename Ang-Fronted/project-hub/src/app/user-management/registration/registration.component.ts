import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    name: '',
    email: '',
    password: '',
    address:'',
    role:'',
    profile_picture:''
  };
  constructor(
    private http: HttpClient,
    // private toastr : ToastrService,
    private router : Router,
    ) {}


  onSubmitRegisterUser(): void {
    
   const registrationData = {
    name : this.user.name,
    email:this.user.email,
    password:this.user.password,
    role:this.user.role
   }

   this.http.post(
    'http://localhost:8888/projecthub/register' , 
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