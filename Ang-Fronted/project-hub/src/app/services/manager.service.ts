import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsers } from '../interfaces/responseUser';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managerDetails!: ResponseUsers;

  constructor(
    private http : HttpClient,
  ) { }

  setManagerDetails(mangerData:ResponseUsers){
    this.managerDetails=mangerData;
  }
  getManagerDetails(){
    return this.managerDetails;
  }

}
