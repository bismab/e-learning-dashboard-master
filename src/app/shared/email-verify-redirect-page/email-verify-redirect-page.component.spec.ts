import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifyRedirectPageComponent } from './email-verify-redirect-page.component';

describe('EmailVerifyRedirectPageComponent', () => {
  let component: EmailVerifyRedirectPageComponent;
  let fixture: ComponentFixture<EmailVerifyRedirectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerifyRedirectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifyRedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
