import { Injectable } from '@angular/core';
import { Users } from './users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginComponent } from './user-management/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  baseLoginUrl :string = 'http://localhost:8888/projecthub/signIn';
  userDetails!: Users;

  constructor(
    private http : HttpClient,
  ) { }

  setUserDetails(userData:Users){
    this.userDetails=userData;
  }
  getUserDetails(){
    return this.userDetails;
  }


    userLogin(username:string,password:string){

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const loginData = {
        username:username,
        password:password
      }
      console.log(username+" "+password)

      return this.http.post<Users>(this.baseLoginUrl,loginData,httpOptions)
    }

    clearUserData(){
      
    }


}
