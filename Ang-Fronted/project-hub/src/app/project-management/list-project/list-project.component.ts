import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Project } from 'src/app/interfaces/projects';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Users } from 'src/app/interfaces/users';
import { ProductService } from 'src/app/services/product.service';
import { UserDetailsService } from 'src/app/user-details.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent {


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



  

    

}

