import { Component, OnInit } from '@angular/core';
import { RegisterAccount, ResponseUser, User } from '../modals/user';
import { Task } from '../modals/task';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  accountToBeCreated:RegisterAccount= {
    name: '',
    email: '',
    password: '',
    profile_picture: '',
    role: ''
  }

  allAvailableUsers:ResponseUser[]=[];
  allAvailableManager:ResponseUser[]=[];
  allAvailableAdmins:ResponseUser[]=[];

  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  constructor(
    private userDetailsService : UserDetailsService
    ){}
  ngOnInit(): void {
    const currentStoredUserdata = localStorage.getItem("loggedInUserData");
    if (currentStoredUserdata) {
      this.currentLoggedInUser = JSON.parse(currentStoredUserdata);
    } else {
      this.currentLoggedInUser = this.userDetailsService.getCurrentLoggedInUser();
    };
    this.userDetailsService.getAllUsers(this.currentLoggedInUser.jwt_token)
      .subscribe(
        (response) => {
          this.allAvailableUsers = response;
          console.log(this.allAvailableUsers);
        },
        (error) => {
          console.log(error);
        });

  }


  onSubmitRegisterAccount(){
    this.userDetailsService.registerAccount(this.accountToBeCreated,this.currentLoggedInUser.jwt_token)
                           .subscribe(
                            (response)=>{
                              console.log(response);
                            },
                            (error)=>{
                              console.log(error);
                            }
                           );
  }

  deleteAccount(index:string){

  }

}
