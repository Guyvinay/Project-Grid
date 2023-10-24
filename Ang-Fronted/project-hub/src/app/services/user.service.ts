import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsers } from '../interfaces/responseUser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  clearUserData(){
      
  }


}
