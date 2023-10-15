import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/projects';
import { ResponseUsers } from 'src/app/interfaces/responseUser';
import { Users } from 'src/app/interfaces/users';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-unit-project',
  templateUrl: './unit-project.component.html',
  styleUrls: ['./unit-project.component.css']
})
export class UnitProjectComponent implements OnInit {

  constructor(private projectService : ProductService){}

  responseUsers !: ResponseUsers;
  respProjects !: Project[] ;
  respProductsUsers !: Users[];
  isProjectSectionShown!:false;
  isSelectedProjectShown!:false



  @Input()selectedProject!:Project;

  ngOnInit(): void {
    console.log(this.projectService.selectedProject)
  }

  logOutUser(){

  }
  showAllUsers(){
    
  }
  renderingSelectedProject(proj:Project){
    
  }

}
