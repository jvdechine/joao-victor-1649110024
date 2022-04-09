import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ToDo from './models/toDo.interface';
import Response from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  addToDo(name, color): Observable<Response<ToDo>>{
    var json = {
      name,
      color
    }

    return this.http.post<Response<ToDo>>(environment.apiUrl + 'toDo', json)
  }

  getToDos(): Observable<Response<ToDo[]>>{
    return this.http.get<Response<ToDo[]>>(environment.apiUrl + 'toDo/getAll')
  }
}
