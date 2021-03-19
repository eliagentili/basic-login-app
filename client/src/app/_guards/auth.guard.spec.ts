import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/users/login' };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    service.logout();
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users/login'], {
      queryParams: { returnUrl: '/users/login' },
    });
  });

  it('should allow the authenticated user to access app', (done) => {
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
    service.login('username', 'password').subscribe((response) => done());

    const req = httpMock.expectOne(`/api/users/login`);
    req.flush(mockResponse);

    expect(service.userValue).toBe(mockResponse.user);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
