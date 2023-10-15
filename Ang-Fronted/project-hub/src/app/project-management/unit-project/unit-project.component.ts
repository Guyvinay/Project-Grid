import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/projects';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Users } from 'src/app/interfaces/users';
import { ProductService } from 'src/app/services/product.service';
import { UserDetailsService } from 'src/app/user-details.service';

@Component({
  selector: 'app-unit-project',
  templateUrl: './unit-project.component.html',
  styleUrls: ['./unit-project.component.css']
})
export class UnitProjectComponent implements OnInit {

  constructor(
    private projectService : ProductService,
    private userDetailsService : UserDetailsService
    ){}

  responseUsers !: ResponseUsers;
  respProjects !: Project[] ;
  respProductsUsers !: Users[];
  isProjectSectionShown!:false;
  isSelectedProjectShown!:false
  selectedProject!:Project;

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData')
    if(storedUserData){
      this.responseUsers=JSON.parse(storedUserData);
    }else {
      this.responseUsers=this.userDetailsService.getUserDetails();
    }
    this.selectedProject = this.projectService.selectedProject;
  }

  logOutUser(){

  }
  showAllUsers(){
    
  }
  renderingSelectedProject(proj:Project){
    
  }

}
