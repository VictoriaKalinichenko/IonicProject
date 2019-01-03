import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ToastController } from 'ionic-angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private toastCtrl: ToastController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => { },
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    console.log(error);
                    let toast = this.toastCtrl.create({
                        duration: 3000,
                        position: 'middle'
                    });
                    
                    toast.setMessage('Server error');
                    toast.present();
                }
            }
        ));
    }
}