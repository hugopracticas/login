import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCreatedComponent } from './email-created.component';

describe('EmailCreatedComponent', () => {
  let component: EmailCreatedComponent;
  let fixture: ComponentFixture<EmailCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
