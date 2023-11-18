import { Injectable } from '@angular/core';
import { RegisterAccount, ResponseUser } from '../modals/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utility } from './utilis.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  baseUserUrl =  Utility.baseUrl+"/api/users";
  baseProfileUrl = Utility.baseUrl+"/api/profiles";
  
  currentLoggedInuser : ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  };

  constructor(
    private http : HttpClient
  ) { }

  setCurrentLoggedInUser(loggedInUserDetails:ResponseUser){
    this.currentLoggedInuser = loggedInUserDetails;
  }

  getCurrentLoggedInUser() : ResponseUser {
    return this.currentLoggedInuser;
  }

  getAllUsers(token:string):Observable<any>{
    console.log("From User Service get All Users")
    const httpOption = {
      headers : new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
    };
    return this.http.get<any>(this.baseUserUrl+"/getAllUsers", httpOption);
  };

  getAllProfiiles(jwtToken: string):Observable<any>{
    // console.log(jwtToken);
     return this.http.get<any>( 
      this.baseUserUrl+"/getAllUsersByRoleManager",
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      })
    });
  }


  registerAccount(reigsterUser:RegisterAccount, token:string) :Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      })
    };

    if(reigsterUser.role==='USER'){
      return this.http.post<any>(this.baseUserUrl+"/userRegister", reigsterUser);
    }else if(reigsterUser.role==='MANAGER'){
      return this.http.post<any>(this.baseUserUrl+"/registerManager", reigsterUser, httpOptions);
    }else{
      return this.http.post<any>(this.baseProfileUrl+"/registerProfile", reigsterUser, httpOptions);
    }

  }
 
}
