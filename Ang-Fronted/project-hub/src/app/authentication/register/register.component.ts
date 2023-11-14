import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterUser } from 'src/app/interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userToBeRegister: RegisterUser  = {
    name: '',
    email: '',
    profile_picture: '',
    password: '',
  }

  constructor(
    private http: HttpClient,
    private router : Router,
    private spinner: NgxSpinnerService
  ){

  }


  onSubmitRegisterUser(){


    

  }

}
