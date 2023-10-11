import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent {

  displayedColumns: string[] = [ 'Id','Project_Name','Description', 'Start_Date', 'End_Date'];
  // displayedColumns: string[] = [ 'Id','Project Name'];

    dataSource:any = [];


    constructor(
      private http : HttpClient
    ){}
    ngOnInit(): void {
     this.loadProjectListData();
    }


    loadProjectListData():void{
      this.http.get(
        'http://localhost:8080/projecthub/projects/projects'
      )
      .subscribe(
        (response)=>{
          this.dataSource = response;
          console.log(response);
        },
        (error)=>{
          console.log(error);
        }
      )
    }

}
