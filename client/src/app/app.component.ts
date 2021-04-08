import { Component, OnDestroy } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { User } from './_models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  user: User;

  constructor(private authService: AuthService) {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => (this.user = x));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  logout(): void {
    this.authService.logout();
  }
}
