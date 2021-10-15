import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, Validator } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class MatchPassword implements Validator{


    validate(formGroup: FormGroup){
        const { password, passwordConfirmation } = formGroup.value;

        if( password === passwordConfirmation ){
            return null;
        }else{
            return { passwordDontMatch: true }
        }
    }

    
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
    
}
