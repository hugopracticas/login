
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor( private http: HttpClient, private authService: AuthService ){

    }

    validate = (control: FormControl) => {
        const { value } = control;

        // console.log( this.http );
        // return null;
        return this.authService.usernameAvailable( value )
        .pipe(
            map( value => {
                console.log( value );
                if( value.available ){
                    return null;
                }
            }),
            catchError((err) => {
                console.log(err);
                if(err.error.username){
                    return of({ nonUniqueusername: true })
                }else{
                    return of({ noConection: true });
                }
            })
        )
    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}


/**Observable from POST Request
 * 
 * *Response if username is OK { availabble: true }
 * -map
 * -null
 * 
 * *ERROR if username is in use
 * {nonUniqueUsername: true}
 */