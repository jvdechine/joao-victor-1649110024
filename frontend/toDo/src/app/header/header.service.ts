import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  loginUser(email, password):any{
    var json = {
      email,
      password
    }
    return this.http.post(environment.apiUrl + 'auth', json);
  }

  registerUser(name, phoneNumber, email, password):any{
    var json = {
      name, phoneNumber, email, password
    }
    return this.http.post(environment.apiUrl + 'user/register', json);
  }
}
