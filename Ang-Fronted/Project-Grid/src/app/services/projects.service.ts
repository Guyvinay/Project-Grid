import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  



}
