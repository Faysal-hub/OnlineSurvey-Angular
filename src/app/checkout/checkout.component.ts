import { NgForm } from '@angular/forms';
import { Shipping } from './../models/shipping';
import { OrderService } from './../order.service';
import { map } from 'rxjs/operators';
import { Cart } from './../models/cart';
import { CartService } from './../cart.service';
import { Order } from './../models/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public shipping: Shipping = {} as Shipping;
  public cart: Cart;
  private cartSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart())
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
      )
      .subscribe((c) => (this.cart = c));
  }

  async placeOrder(): Promise<void> {
    let order = new Order(this.cart, this.shipping);
    let result = await this.orderService.placeOrder(order);

    window.location.href = `/order-success/${result.key}`;
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
