import { CartService } from './cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from './models/order';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly dbPath = '/orders';

  constructor(
    private db: AngularFireDatabase,
    private cartService: CartService
  ) {}

  async placeOrder(order: Order): Promise<firebase.database.ThenableReference> {
    let result = this.db.list(this.dbPath).push(order);
    this.cartService.unassignCart();

    return result;
  }
}
