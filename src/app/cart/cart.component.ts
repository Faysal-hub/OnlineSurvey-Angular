import { Product } from './../models/product';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = (await this.cartService.getCart())
      .snapshotChanges()
      .pipe(
        map(
          (sc) =>
            new Cart(
              sc.key,
              sc.payload.val().cartLines,
              sc.payload.val().createdOn
            )
        )
      );
  }

  clearCart() {
    this.cartService.clearCart();
  }

  // removeItem(item: Product) {
  //   this.cartService.removeItem(item);
  // }
}
