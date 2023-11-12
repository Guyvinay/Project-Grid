import { Injectable } from '@angular/core';
import { ResponseUser } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  
  currentLoggedInuser : ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  };

  constructor() { }


  setCurrentLoggedInUser(loggedInUserDetails:ResponseUser){
    this.currentLoggedInuser = loggedInUserDetails;
  }

  getCurrentLoggedInUser() : ResponseUser {
    return this.currentLoggedInuser;
  }
 
}
