import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_API } from "../token/baseUrl.token";


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_API) private apiUrl:string ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', request.url);
    if (!request.url.startsWith('http')) {
      const apiReq = request.clone({
       url: `${this.apiUrl.replace(/\/$/, '')}/${request.url.replace(/^\/+/, '')}`
      });
      console.log('Modified URL:', apiReq.url);
      return next.handle(apiReq);
    }
    return next.handle(request);
  }
}
