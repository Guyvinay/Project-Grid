import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppConfig } from '../services/config.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

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
    
  ngOnInit(): void {
  }


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
