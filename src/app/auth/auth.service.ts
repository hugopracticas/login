import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

interface UsernameAvailableResponse {
  available: boolean;
}

interface Signupcredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false); //Dudas aqui!!
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
   return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`,
    {
      username: username
    });
  }


  /**
   * Metodo con el cual se hace el registro del usuario
   * 
   * El operador Angular Tap RxJs devuelve un observable que es idéntico a la fuente. 
   * No modifica la secuencia de ninguna manera. El operador Tap es útil para registrar
   * el valor, depurar la secuencia para los valores correctos o realizar cualquier
   * otro efecto secundario.
   */
  signup( credentials: Signupcredentials ){
    // return this.http.post<any>(`${this.rootUrl}/auth/signup`, credentials);
    return this.http.post<SignupResponse>
    (`${this.rootUrl}/auth/signup`, 
    credentials)
      .pipe(
      tap( ({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }


  /**
   * En este metodo se usa el servicio para verificar que el usuario este logeado
   */
  checkAuth(){
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap( ({ authenticated, username }) => {
        this.signedin$.next( authenticated );
        this.username = username;
      })
    );
  }


  /**
   * Metodo para para hacer el logout de la aplicacion
   */
  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  /**
   * Este metodo nos sirve para validar el username y password
   */
  signin( credentials: SigninCredentials){
      return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
        .pipe(
          tap(({ username }) => {
            this.signedin$.next(true);
            this.username = username;
          })
        )
  }

}
