import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verifyIfIsAuth(param = ""): Observable<any>{
    return this.http.get(environment.apiUrl + 'auth/isAuthenticated' + param);
  }

  refreshToken() : Observable<any>{
    return this.http.post(environment.apiUrl + 'auth/refresh', undefined)
  }
}
