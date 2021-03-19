import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './../../_services/auth.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<HomeComponent>;
  let component: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
      declarations: [HomeComponent],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name', (done) => {
    const mockResponse = {
      user: {
        firstName: 'Andrew',
      },
      token: '1234567890',
    };
    service.login('username', 'password').subscribe((response) => done());
    const req = httpMock.expectOne(`/api/users/login`);
    req.flush(mockResponse);

    // Sono obbligato a dichiarare una nuova fixture perché altrimenti non viene aggiornata correttamente
    // dopo il login con i dati nella view
    const afterLoginFixture = TestBed.createComponent(HomeComponent);
    afterLoginFixture.detectChanges();
    const compiled = afterLoginFixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hi Andrew!');
  });
});
