import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsers } from '../interfaces/responseUser';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetails!: ResponseUsers;

  constructor(
    private http : HttpClient,
  ) { }

  // getUsers(jwtToken:String) : Observable<Users[]> {

  //   return this.http.get<User[]>()

  // }

  setUserDetails(userData:ResponseUsers){
    this.userDetails=userData;
  }
  getUserDetails(){
    return this.userDetails;
  }

  clearUserData(){
      
  }


}
