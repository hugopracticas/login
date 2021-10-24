import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-created',
  templateUrl: './email-created.component.html',
  styleUrls: ['./email-created.component.css']
})
export class EmailCreatedComponent implements OnInit {

  showModal = false;
  email: Email;

  constructor( private authService: AuthService,
                private emailService: EmailService ) { 
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`
    };
  }

  ngOnInit(): void {
  }

  onSubmit(email: Email){
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
