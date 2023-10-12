import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'http://localhost:8888/projecthub/projects/projects';

  constructor(
    private http : HttpClient
  ) { }


  getAllProducts(jwtToken:String) : Observable<Project[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` // Replace 'Bearer' with your token type if needed
    });

    return this.http.get<Project[]>(
      this.productUrl,
      {headers}
    );

  }

}
