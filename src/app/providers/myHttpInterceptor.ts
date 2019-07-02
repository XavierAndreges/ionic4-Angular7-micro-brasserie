import { Injectable,Inject, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class MyHttpInterceptor implements HttpInterceptor {

  public AuthorizationKey: string = "Authorization";
  public AuthorizationValue: string = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE1ODQ0NDYzMTAsInVzZXJuYW1lIjoienV0IiwiaWF0IjoiMTU1MjkxMDMxMCJ9.Qhuuxkl2CPmR5pCL_S500tY7tA8Ybr2eRAkBwJL8IfFIfj8I8zMKlD9IHvoFAWwCXXCtQ5iL7MgH3ulwxs0E3V-enKwd2UYMC8Xelfhwnak7Urx9kUSI1vhsTF_DFf7NtpVP1ruicyahnVZKUl6P7xWVMKG41fTj_hTSZNGGiS1uxAOZPT6rUKuyT3jnogNP6ke18FA65KSK6ikf8Ft9piaYd5mE66D1DmGB_yFn6vARBWc1jz5urXT7W8R_N-w6--IOoAn0eq47zgp-k17UP7sLKmA5q-uV8O5Mr_FgGsO7BUqc0S13EAKG3DZH9Jadx3ZP9rf_FUkqvQPMk1-L66YzHef88BC79uPe3ahyCacrC-Oz8XXR1iMDF9guGn3wMPM7ShgZkOOwGcbK9pgsbbYlDVGwFPPxmessfonImcJ1C6h9GFU1tsjhHtAaFJhSs9caW2_jIjCRhKQQYsF1FwKHbFxldGwEflsS5gfRrN2Jcu5Us7fi6Bz3YEuaXNrf8po-mFVKdY_In_A7hRG7iHXEC6itdXkJ7zKKWU9yAwFA0TQV3G71QlvuWleMSsnyY54LH5Z4EIu4OQcBDNSOveUWL5JCIZ-ZLy4eeXPy2k2R-u4RzLDjK6qkqmo3o_817GcTn_dHiCDAsJp1y7JprEvWHe8Gej9uvlmdh-5VwUE";


  constructor(private injector: Injector) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("XXXX MyHttpInterceptor => intercept() : request : ", request);
    //console.log("XXXX MyHttpInterceptor => intercept() : HttpHandler : ", HttpHandler);

    const token: string = localStorage.getItem('token');

    request = request.clone({ headers: request.headers.set(this.AuthorizationKey, 'Bearer ' + token)});

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    
    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('XXXX MyHttpInterceptor ->intercept() / NEXT : event', event);
            }
            return event;
        })
    );
  }


}
