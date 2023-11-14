import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../modals/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseProjectUrl = "http://localhost:8888/api/projects";

  constructor(
    private http : HttpClient
  ) { }

  getAllProjects(token:string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
    };
    return this.http.get<any>(this.baseProjectUrl+'/getAllProjects',httpOptions);
  };

  createProject(project:Project,  token:string):Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.post<any>(this.baseProjectUrl+"/createProject",project,{headers});
  }
  



}
