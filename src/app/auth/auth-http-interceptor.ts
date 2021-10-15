import { Injectable } from "@angular/core";
import { from } from "rxjs";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http'
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    /**
     * a traves de este metodo podemos obtener informacion
     * del estatus de nuestro request que estamos haciendo y
     * de la respuesta.
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        //Modify or log the outgoing request
        const modifiedReq = req.clone({
            withCredentials: true
        })
        console.log(req);
        return next.handle(modifiedReq).pipe(
            tap(val => {
                if( val.type === HttpEventType.Sent ){
                    console.log('request was sent to server');
                }

                if( val.type === HttpEventType.Response ){
                    console.log('Got a response from the API', val);
                }
            })
        );
    }
}
