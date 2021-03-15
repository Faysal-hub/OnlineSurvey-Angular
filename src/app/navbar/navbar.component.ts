import { Observable } from 'rxjs';
import { AppUser } from './../models/appUser';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser$: Observable<AppUser>;

  constructor(private authService: AuthService) {
     this.appUser$ = authService.AppUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
