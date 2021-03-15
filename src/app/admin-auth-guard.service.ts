import { UsersService } from './user.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
     return this.authService.AppUser$.pipe(map((appUser) => appUser.isAdmin));  
  }
}
