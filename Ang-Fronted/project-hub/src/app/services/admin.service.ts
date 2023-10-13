import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsers } from '../interfaces/responseUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  adminDetails!: ResponseUsers;

  constructor(
    private http : HttpClient,
  ) { }

  setAdminDetails(adminData:ResponseUsers){
    this.adminDetails=adminData;
  }
  getAdminDetails(){
    return this.adminDetails;
  }
}
