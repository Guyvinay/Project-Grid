import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserDetailsService } from '../user-details.service';
import { ResponseUsers } from '../interfaces/responseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../interfaces/projects';
import { ProductService } from '../services/product.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  responseUsers !: ResponseUsers;
  respProjects !: Project[] ;
  respProductsUsers !: Users[];

 
  
  constructor(
    private userDetailsService : UserDetailsService,
    private http : HttpClient,
    private productsService : ProductService
  ){  
  }

  ngOnInit(): void {
    initFlowbite();

    const storedUserData = localStorage.getItem('userData')
    if(storedUserData){
      this.responseUsers=JSON.parse(storedUserData);
      // console.log(this.userData.jwt_token)
    }else {
      this.responseUsers=this.userDetailsService.getUserDetails();
      // console.log(this.userData)
    }
      
  }

  logOutUser(){

    this.userDetailsService.clearUserData();

    localStorage.removeItem('userData');
  }


  showProjects(){
    console.log(this.responseUsers.jwt_token);

    this.productsService.getAllProducts(this.responseUsers.jwt_token)
                    .subscribe(
                      (res)=>{
                        this.respProjects=res;
                        this.respProductsUsers=this.respProjects[9].users
                        console.log(this.respProductsUsers)
                      },
                    (err)=>{
                      console.log(err);
                    }
                    )

  }

  

}
