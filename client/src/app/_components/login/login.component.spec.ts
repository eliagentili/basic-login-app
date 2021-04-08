import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [AuthService],
      declarations: [LoginComponent],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.value.username).toBe('');
    expect(component.form.value.password).toBe('');

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('input[formControlName="username"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('input[formControlName="password"]')
    ).toBeTruthy();
  });

  it('should return correct values on form getter', () => {
    expect(component.f.username.value).toBe('');
    expect(component.f.password.value).toBe('');
  });

  it('should correctly update form values', () => {
    component.f.username.setValue('username');
    component.f.password.setValue('password');

    expect(component.f.username.value).toBe('username');
    expect(component.f.password.value).toBe('password');
  });

  it('should submit user data on login', () => {
    expect(component.form.valid).toBeFalse();

    component.f.username.setValue('username');
    component.f.password.setValue('password');

    expect(component.submitted).toBeFalse();
    expect(component.loading).toBeFalse();
    component.onSubmit();
    expect(component.submitted).toBeTrue();
    expect(component.loading).toBeTrue();
    expect(component.form.valid).toBeTrue();
  });
});
