import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  project = {
    name:'',
    desc:'',
    start_date:'',
    end_date:'',
    project_logo:''
  }

  dataSource:any = [];

  constructor(
    private http : HttpClient
  ){}
  ngOnInit(): void {
   
  }


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


}
