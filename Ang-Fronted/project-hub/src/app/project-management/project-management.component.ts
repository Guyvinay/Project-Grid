import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../services/product.service';
import { Project } from '../interfaces/projects';
import { ResponseUsers } from '../interfaces/responseUser';
import { Users } from '../interfaces/users';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

 
  responseUsers !: ResponseUsers;
  respProjects !: Project[] ;
  respProductsUsers !: Users[];
  selectedProject !: Project;
  
  isElementShown = false;
  isSelectedProjectShown = false;
  isAllProjectShown = false;

  isProjectSectionShown = false;


  showProjectSection(){
    this.isProjectSectionShown=!this.isProjectSectionShown;
  }


  
  constructor(
    private userDetailsService : UserDetailsService,
    private http : HttpClient,
    private productsService : ProductService
  ){  
  }

  ngOnInit(): void {

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
                        console.log(this.respProjects)
                      },
                    (err)=>{
                      console.log(err);
                    }
                    )

  }

  renderingSelectedProject( project : Project  ){
    this.productsService.selectedProjects(project);
  }

  

    

}
