import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, 
              private http: HttpClient,
              private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('token')?.length > 0){
      return new Promise((resolve, reject) => {
        this.authService.verifyIfIsAuth().toPromise()
        .then(
          data => {
            if(sessionStorage.getItem('lastTimeAuthenticated')){
              var lastTimeAuthenticated = new Date(sessionStorage.getItem('lastTimeAuthenticated'));
              if(new Date(lastTimeAuthenticated.getTime() + 30 * 60000) <= new Date()){
                this.authService.refreshToken().subscribe(
                  data2 => {
                    sessionStorage.setItem('token', data2.result);
                    sessionStorage.setItem('lastTimeAuthenticated', new Date().toString())
                    resolve(true);
                  },
                  err => {
                    this.router.navigate(["/"]);
                  }
                )
              }else{
                resolve(true);
              }
            }else{
              this.router.navigate(["/"]);
            }
          }
        )
        .catch(
          err => {
            this.router.navigate(["/"]);
          }
        )
      })
    }else{
      this.router.navigate(["/"]);
    }
  }
  
}
