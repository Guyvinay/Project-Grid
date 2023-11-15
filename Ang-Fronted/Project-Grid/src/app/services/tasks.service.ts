import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTask } from '../modals/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseTaskUrl = "http://localhost:8888/api/tasks"

  constructor(
    private http : HttpClient
  ) { }

  createTask(task:CreateTask,token:string):Observable<any>{
    // const httpOptions = {
    //   header: new HttpHeaders({
    //     "Authorization":`Bearer ${token}`
    //   })
    // }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
      return this.http.post<any>(
        this.baseTaskUrl+'/createTask',
        task ,
        {headers}
      );
    // return this.http.post<any>(this.baseTaskUrl+"/createTask",task,httpOptions);
  }
  getAllTasks(token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.baseTaskUrl+"/getAllTasks",{headers});
  }
  deleteTaskById(id:number,token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(this.baseTaskUrl+`/deleteTask/${id}`,{headers},);
  }

}
