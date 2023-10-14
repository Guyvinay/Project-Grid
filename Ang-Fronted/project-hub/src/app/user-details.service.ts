import { Injectable } from '@angular/core';
import { ResponseUsers } from './interfaces/responseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginComponent } from './user-management/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  baseLoginUrl :string = 'http://localhost:8888/projecthub/signIn';
  userDetails!: ResponseUsers;

  constructor(
    private http : HttpClient,
  ) { }

  setUserDetails(userData:ResponseUsers){
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

      return this.http.post<ResponseUsers>(this.baseLoginUrl,loginData,httpOptions)
    }

    clearUserData(){
      
    }


}
