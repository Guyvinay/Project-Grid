import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  project = {
    name:'',
    desc:'',
    start_date:'',
    end_date:''
  }

  isAddProjects = false;
  isListProjects = false;

  showAddProjects(){
    this.isAddProjects=!this.isAddProjects;
  }
  listAllProjects(){
    // Swal.fire('Congratulations', 'You have Successfully registered. Now You can Login... ', 'success');
    this.isListProjects=!this.isListProjects
  }

  projectList:any = [];

  constructor(
    private http : HttpClient
  ){}







  ngOnInit(): void {
   this.loadProjectListData();
  }


  onSubmit():void{

    const projectData = {
      name:this.project.name,
      description:this.project.desc,
      start_date:this.project.start_date,
      end_date:this.project.end_date
    }

    this.http.post(
      'http://localhost:8080/projecthub/projects/register',
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

  loadProjectListData():void{
    this.http.get(
      'http://localhost:8080/projecthub/projects/projects'
    )
    .subscribe(
      (response)=>{
        this.projectList = response;
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
