import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { Alert, AlertType } from '../_models/alert';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a success alert', (done) => {
    const id = 'default-alert';
    const message = 'Success!';
    const subject = service.onAlert().subscribe((alert) => {
      expect(alert.id).toBe(id);
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Success);
      done();
    });
    const clear = service.success(message);
  });

  it('should create an error alert', (done) => {
    const id = 'default-alert';
    const message = 'Error!';
    const subject = service.onAlert().subscribe((alert) => {
      expect(alert.id).toBe(id);
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Error);
      done();
    });
    const clear = service.error(message);
  });

  it('should create an info alert', (done) => {
    const id = 'default-alert';
    const message = 'Info!';
    const subject = service.onAlert().subscribe((alert) => {
      expect(alert.id).toBe(id);
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Info);
      done();
    });
    const clear = service.info(message);
  });

  it('should create a warn alert', (done) => {
    const id = 'default-alert';
    const message = 'Warn!';
    const subject = service.onAlert().subscribe((alert) => {
      expect(alert.id).toBe(id);
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Warning);
      done();
    });
    const clear = service.warn(message);
  });

  it('should create a custom alert', (done) => {
    const id = 'custom-alert';
    const type = AlertType.Info;
    const message = 'Custom message!';
    const autoClose = true;
    const keepAfterRouteChange = true;
    const fade = true;
    const customAlert = {
      id,
      type,
      message,
      autoClose,
      keepAfterRouteChange,
      fade,
    };
    const subject = service.onAlert(id).subscribe((alert) => {
      expect(alert.id).toBe(id);
      expect(alert.type).toBe(type);
      expect(alert.message).toBe(message);
      expect(alert.autoClose).toBe(autoClose);
      expect(alert.keepAfterRouteChange).toBe(keepAfterRouteChange);
      expect(alert.fade).toBe(fade);
      done();
    });
    const clear = service.alert(customAlert);
  });

  it('should clear alerts for default id', (done) => {
    const id = 'default-alert';
    const subject = service.onAlert().subscribe((alert) => {
      expect(alert.id).toBe(id);
      done();
    });
    const clear = service.clear(id);
  });

  it('should clear alerts for specified id', (done) => {
    const id = 'custom-alert';
    const subject = service.onAlert(id).subscribe((alert) => {
      expect(alert.id).toBe(id);
      done();
    });
    const clear = service.clear(id);
  });
});
