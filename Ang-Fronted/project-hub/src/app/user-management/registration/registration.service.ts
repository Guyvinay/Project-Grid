import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'https://project-grid-production.up.railway.app/customers';

  constructor(private http :HttpClient  ) { }

  registerUser(userData:any) : Observable<any> {
    return this.http.post(`${this.apiUrl}`,userData)
  }

}
