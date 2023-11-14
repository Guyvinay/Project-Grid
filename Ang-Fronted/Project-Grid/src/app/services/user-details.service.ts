import { Injectable } from '@angular/core';
import { ResponseUser } from '../modals/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  basUrl = "http://localhost:8888/api/users";
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
    return this.http.get<any>(this.basUrl+"/getAllUsers", httpOption);
  };

  getAllProfiiles(jwtToken: string):Observable<any>{
    // console.log(jwtToken);
     return this.http.get<any>( 
      this.basUrl+"/getAllUsersByRoleManager",
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}` // Pass the token here
      })
    });

  }
 
}
