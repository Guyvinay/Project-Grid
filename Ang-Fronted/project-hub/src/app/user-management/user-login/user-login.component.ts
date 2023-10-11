import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {


  userCreds = {
    loginEmail:'',
    loginPassword:'',

  }

  baseLoginUrl :string = 'http://localhost:8888/projecthub/signIn';

  constructor( 
    private http : HttpClient,
    private router : Router
  ){}

  loginUser(){
    const requestbody = {
           username : this.userCreds.loginEmail,
           password : this.userCreds.loginPassword
    }
   // Define the HTTP headers
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  console.log(requestbody)

    this.http.post(
      this.baseLoginUrl,
      requestbody,
      httpOptions
    )
    .subscribe(
      (response)=>{
        Swal.fire('Congratulations', 'You have Successfully Logged-In... It is time for you to Explore Yourself...', 'success');
        console.log(response);

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

}
