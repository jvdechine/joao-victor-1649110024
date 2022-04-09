import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient,
                private router: Router){}
    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(sessionStorage.getItem('token') && request.url.indexOf('isAuthenticated?n=1') == -1){
            var token = sessionStorage.getItem('token');
            try{
                return this.isAuthenticated(token)
                .pipe(
                    tap((data) => {
                        
                    }),
                    mergeMap(data => next.handle(request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                           'Accept': 'application/json',
                        }
                    }))),
                    catchError(() => {
                        return next.handle(request);
                    })
                );
            }catch(e){
                if(request.url.indexOf('auth') == -1)
                    this.router.navigate(['/'])
                else
                    return next.handle(request);
            }
        }else{
            return next.handle(request);
        }
    }

    isAuthenticated(token): any{
        return this.http.get(environment.apiUrl + 'auth/isAuthenticated?n=1', {headers: {'Authorization': 'Bearer ' + token }});
    }
}