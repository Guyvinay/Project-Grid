import { Injectable } from '@angular/core';
import { ResponseUsers } from './interfaces/responseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './interfaces/users';
import { AppConfig } from './services/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  // baseLoginUrl :string = AppConfig.baseUrl+'/projecthub/signIn';
  baseLoginUrl :string = AppConfig.baseUrl+'/projecthub/profileSignIn';

  baseUsersUrl = AppConfig.baseUrl+'/projecthub/usersByRoleUser';
  baseProfilesUrl = AppConfig.baseUrl+'/projecthub/usersByRoleManager';


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
      // console.log(jwtToken);
       return this.http.get<Users[]>( 
        this.baseUsersUrl,
        {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}` // Pass the token here
        })
      });
    }
    getAllProfiiles(jwtToken: string):Observable<Users[]>{
      // console.log(jwtToken);
       return this.http.get<Users[]>( 
        this.baseProfilesUrl,
        {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}` // Pass the token here
        })
      });
    }

    

    clearUserData() {
      
    }


}
