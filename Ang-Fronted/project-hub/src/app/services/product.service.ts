import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projects';
import { Observable } from 'rxjs';
import { ProjectManagementComponent } from '../project-management/project-management.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'http://localhost:8888/projecthub/projects/allProjects';
  selectedProject!:Project;

  constructor(
    private http : HttpClient
  ) { }


  getAllProducts(jwtToken:String) : Observable<Project[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` 
    });

    return this.http.get<Project[]>(
      this.productUrl,
      {headers}
    );

  }


  selectedProjects(project:Project){
    this.selectedProject = project;
    // console.log(project)
  }

}
