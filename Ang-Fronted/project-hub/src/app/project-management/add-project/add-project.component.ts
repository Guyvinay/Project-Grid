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
    end_date:''
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


}
