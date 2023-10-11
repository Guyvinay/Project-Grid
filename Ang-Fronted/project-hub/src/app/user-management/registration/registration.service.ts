import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http :HttpClient  ) { }

  registerUser(userData:any) : Observable<any> {
    return this.http.post(`${this.apiUrl}`,userData)
  }

}
