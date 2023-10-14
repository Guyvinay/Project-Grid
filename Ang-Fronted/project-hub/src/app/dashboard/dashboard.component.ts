import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserDetailsService } from '../user-details.service';
import { ResponseUsers } from '../interfaces/responseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../interfaces/projects';
import { ProductService } from '../services/product.service';
import { Users } from '../interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
    private productsService : ProductService,
    private router : Router
  ){  
  }

  ngOnInit(): void {
    initFlowbite();

    const storedUserData = localStorage.getItem('userData');
    if(storedUserData){
      this.responseUsers=JSON.parse(storedUserData);
    }else {
      this.responseUsers=this.userDetailsService.getUserDetails();
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
                    });
                    this.router.navigate(["/project"])
  }


  renderingSelectedProject(project:Project){
    this.selectedProject = project;
    this.productsService.selectedProjects(project);
    
  }





  project = {
    name:'',
    desc:'',
    project_logo:'',
    start_date:'',
    end_date:''
  }

  dataSource:any = [];


  onSubmit():void{

    const projectData = {
      name:this.project.name,
      description:this.project.desc,
      project_logo:this.project.project_logo,
      start_date:this.project.start_date,
      end_date:this.project.end_date
    }
    console.log(projectData)

    this.http.post(
      'http://localhost:8888/projecthub/projects/register',
      projectData
    )
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }

  isElementToBShown(){
    this.isSelectedProjectShown=!this.isSelectedProjectShown;
  }
  isSelectedToBShown(){
    this.isSelectedProjectShown=!this.isSelectedProjectShown;
  }


  showAllUsers(){

    

  }
  
  

}
