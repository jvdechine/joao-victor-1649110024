import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient,
                private router: Router){}
    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem('token') && request.url.indexOf('isAuthenticated?n=1') == -1){
            var token = sessionStorage.getItem('token');
            try{
                return from(this.isAuthenticated(token))
                .pipe(
                    switchMap(
                        data => {
                            request = request.clone({
                                url:  request.url,
                                setHeaders: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            return next.handle(request);
                        }
                    )
                )
            }catch(e){
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('lastTimeAuthenticated')
                this.router.navigate(['/dashboard'])
            }
        }else{
            return next.handle(request);
        }
    }

    isAuthenticated(token): any{
        return this.http.get(environment.apiUrl + 'auth/isAuthenticated?n=1', {headers: {'Authorization': 'Bearer ' + token }}).toPromise();
    }
}