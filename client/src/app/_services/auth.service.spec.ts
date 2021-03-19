import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { LoginComponent } from './../_components/login/login.component';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const store = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'users/login', component: LoginComponent },
        ]),
        HttpClientTestingModule,
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = value as string);
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should start with undefined user', () => {
    service.logout();
    expect(service.userValue).toBeNull();
  });

  it('should login user', (done) => {
    const mockResponse = {
      user: {
        id: 'fake-id',
        username: 'username',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      },
      token: '1234567890',
    };
    service.login('username', 'password').subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response).not.toBeUndefined();
      expect(JSON.stringify(response)).toEqual(
        JSON.stringify(mockResponse.user)
      );

      expect(localStorage.getItem('access_token')).toBe(mockResponse.token);
      expect(localStorage.getItem('user')).toBe(
        JSON.stringify(mockResponse.user)
      );

      expect(service.userValue).toBe(mockResponse.user);

      done();
    });
    const req = httpMock.expectOne(`/api/users/login`);
    req.flush(mockResponse);
  });

  it('should logout user', () => {
    service.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.userValue).toBeNull();
  });
});
