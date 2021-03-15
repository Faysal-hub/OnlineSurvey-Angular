import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = angularFireAuth.authState;
  }

  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.angularFireAuth.signOut();
  }
}
