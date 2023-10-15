import { Injectable } from '@angular/core';
import { ResponseUsers } from './interfaces/responseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginComponent } from './user-management/user-login/user-login.component';
import { Observable } from 'rxjs';
import { Users } from './interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  // baseLoginUrl :string = 'http://localhost:8888/projecthub/signIn';
  baseLoginUrl :string = 'https://project-grid-production.up.railway.app/projecthub/signIn';
  // baseUserUrl = 'http://localhost:8888/projecthub/users';
  baseUserUrl = 'https://project-grid-production.up.railway.app/projecthub/users';


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


    getAllUsers(jwtToken: string):Observable<Users[]>{
       return this.http.get<Users[]>(this.baseUserUrl,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}` // Pass the token here
        })
      });
    }

    

    clearUserData() {
      
    }


}
