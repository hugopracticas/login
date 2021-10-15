import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router ) { }

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])
  }, { validators: [ this.matchPassword.validate ] });

  

  ngOnInit(): void {
  }

  /**
   * Duda de que es un subscribe
   * .subscribe() es un método del tipo Observable. El tipo Observable es una utilidad
   * que transmite datos de forma asíncrona o sincrónica a una variedad de componentes 
   * o servicios que se han suscrito al observable.
   * 
   * Cuando este metodo se ejecuta se hace el registro del usuario, generando
   * las cookies, y si hay algun
   * error nos regresa el tipo de error
   */
  onSubmit(){
    if(this.authForm.invalid){
      return
    }

    this.authService.signup( this.authForm.value ).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox');
      },
      complete(){

      },
      error: (err) => {
        if(!err.status){
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }
}
