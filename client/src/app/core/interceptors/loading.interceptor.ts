import { BusyService } from './../services/busy.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    constructor(private busyService:BusyService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy()
        return next.handle(req).pipe(
            delay(1000), // for testing delays -> will be removed later
            finalize(()=>{
                this.busyService.idle()
            })
        )
    }
    
}