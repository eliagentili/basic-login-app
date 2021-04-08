import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertsService } from './../../_services/alerts.service';
import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', () => {
  let service: AlertsService;
  let fixture: ComponentFixture<AlertsComponent>;
  let component: AlertsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AlertsService],
      declarations: [AlertsComponent],
    }).compileComponents();

    service = TestBed.inject(AlertsService);

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
