import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router  } from '@angular/router';
import { Email } from './email';
import { catchError } from 'rxjs/operators';
import { EmailService } from './email.service';
import { from } from 'rxjs';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor( private emailService: EmailService, private router: Router ) { }

  resolve(route: ActivatedRouteSnapshot){
    const { id } = route.params;

    return this.emailService.getEmail( id ).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
    // return{
    //   id: 'hjakshdjk',
    //   subject: 'jjkdskjk',
    //   to: 'jkkkjk',
    //   from: 'hkhkhk',
    //   text: 'hjkhkj',
    //   html: 'ghjhkj'
    // };
  }

}
