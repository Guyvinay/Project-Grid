import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCreds } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  baseLoginUrl = 'http://localhost:8888/api/profiles/profileLogin';
  

  constructor(
    private http : HttpClient,
  ) { }

  loginUser(loginCreds:LoginCreds) :Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const loginData = {
      username:loginCreds.email,
      password:loginCreds.password
    }
    return this.http.post<any>(this.baseLoginUrl, loginData, httpOptions);
  }



}
