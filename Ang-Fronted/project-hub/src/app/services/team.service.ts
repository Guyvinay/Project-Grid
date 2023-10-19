import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './config.service';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/teams';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  baseUserUrl = AppConfig.baseUrl+'/projectGrid/getAllTeams';

  constructor(
    private http : HttpClient,
  ) { }


  getAllTeams(jwtToken: string):Observable<Team[]>{
    return this.http.get<Team[]>(this.baseUserUrl,{
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: `Bearer ${jwtToken}` // Pass the token here
     })
   });
 }


}
