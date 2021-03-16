import { CartLine } from './models/cartLine';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly dbPath = '/carts';

  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<AngularFireObject<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<Cart>(`${this.dbPath}/${cartId}`);
  }

  async addToCart(product: Product): Promise<void> {
    return this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    return this.updateQuantity(product, -1);
  }

  private async updateQuantity(
    product: Product,
    change: number
  ): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let cartLine$ = this.getCartLine(cartId, product.key);

    cartLine$
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map((scl) => ({ key: scl.key, ...scl.payload.val() })))
      .subscribe((cl) =>
        cartLine$.update({
          product: product,
          quantity: (cl.quantity || 0) + change,
        })
      );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let cart = await this.create();
    localStorage.setItem('cartId', cart.key);

    return cart.key;
  }

  private create(): firebase.database.ThenableReference {
    return this.db.list(this.dbPath).push({
      createdOn: new Date().toLocaleDateString(),
    });
  }

  private getCartLine(
    cartId: string,
    productId: string
  ): AngularFireObject<CartLine> {
    return this.db.object<CartLine>(
      `${this.dbPath}/${cartId}/cartLines/${productId}`
    );
  }
}
