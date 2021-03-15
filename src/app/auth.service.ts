import { UsersService } from './user.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/appUser';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private usersService: UsersService,
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = angularFireAuth.authState;
  }

  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout(): void {
   this.angularFireAuth.signOut()
    .then(() => this.router.navigate(['/']));
  }

  get AppUser$() : Observable<AppUser> {
    return this.user$
    .pipe(switchMap(user => {
      if (user)
        return this.usersService.get(user.uid).valueChanges();

      return of(null);
    }
    )); 
  }
}
