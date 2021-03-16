import { CartService } from './../cart.service';
import { Observable } from 'rxjs';
import { AppUser } from './../models/appUser';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser$: Observable<AppUser>;
  cartLinesCount: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.appUser$ = this.authService.AppUser$;

    (await this.cartService.getCart()).valueChanges().subscribe((c) => {
      this.cartLinesCount = 0;
      for (let productId in c.cartLines)
        this.cartLinesCount += c.cartLines[productId].quantity;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
