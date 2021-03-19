import { Component } from '@angular/core';

import { User } from './../../_models/user';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }
}
