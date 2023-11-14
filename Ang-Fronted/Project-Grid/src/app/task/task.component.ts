import { Component, OnInit } from '@angular/core';
import { CreateTask } from '../modals/task';
import { ResponseUser, User } from '../modals/user';
import { HttpClient } from '@angular/common/http';
import { UserDetailsService } from '../services/user-details.service';
import { TasksService } from '../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  taskToBeCreated: CreateTask = {
    title: '',
    description: '',
    due_date: '',
    priority: '',
    status: '',
    userEmail: ''
  }
  availableUsers: User[] = [];

  currentLoggedInUser: ResponseUser = {
    name: '',
    jwt_token: '',
    email: '',
    profile_picture: '',
    profile_id: '',
    role: ''
  }

  constructor(
    private userDetailsService: UserDetailsService,
    private taskService: TasksService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    const currentStoredUserdata = localStorage.getItem("loggedInUserData");

    if (currentStoredUserdata) {
      this.currentLoggedInUser = JSON.parse(currentStoredUserdata);
    } else {
      this.currentLoggedInUser = this.userDetailsService.getCurrentLoggedInUser();
    };
    console.log(this.currentLoggedInUser);
    this.userDetailsService.getAllUsers(this.currentLoggedInUser.jwt_token)
      .subscribe(
        (response) => {
          this.availableUsers = response;
          console.log(this.availableUsers);
        },
        (error) => {
          console.log(error);
        });
  }

  createTask() {
    // console.log(this.taskToBeCreated);
    this.spinner.show();
    this.taskService.createTask(this.taskToBeCreated, this.currentLoggedInUser.jwt_token)
      .subscribe(
        (response) => {
          console.log(response);
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  addUser(user: User) {
    this.taskToBeCreated.userEmail = user.email;
  }

}
