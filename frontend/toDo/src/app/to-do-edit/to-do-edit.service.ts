import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ToDo from '../dashboard/models/toDo.interface';
import Response from '../models/response.interface';
import ToDoItem from './to-do-edit.interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoEditService {

  constructor(private http: HttpClient) { }

  getToDo(id): Observable<Response<ToDo>>{
    return this.http.get<Response<ToDo>>(environment.apiUrl + 'toDo?id=' + id);
  }

  getAllItems(id): Observable<Response<ToDoItem[]>>{
    return this.http.get<Response<ToDoItem[]>>(environment.apiUrl + 'toDoItems/getAll/' + id);
  }

  insertItem(json): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(environment.apiUrl + 'toDoItems', json);
  }

  insertAll(json, toDoId): Observable<Response<ToDoItem[]>>{
    return this.http.post<Response<ToDoItem[]>>(environment.apiUrl + 'toDoItems/insertAll?toDoId=' + toDoId, json);
  }
}
