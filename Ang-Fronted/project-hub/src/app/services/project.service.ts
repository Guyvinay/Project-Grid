import { Injectable } from '@angular/core';
import { AppConfig } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  projectsUrl = AppConfig.baseUrl+'/projecthub/projects/allProjects';

  selectedProject!:Project;

  constructor(
    private http : HttpClient
  ) { }


  getAllProjects(jwtToken:String) : Observable<Project[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` 
    });

    return this.http.get<Project[]>(
      this.projectsUrl,
      {headers}
    );

  }

  selectedProjects(project:Project){
    this.selectedProject = project;
    console.log(project)
  }



}
