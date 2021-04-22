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
  // private readonly dbPathHistory = '/cartHistory';

  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<AngularFireObject<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<Cart>(`${this.dbPath}/${cartId}`);
  }

  async addToCart(product: Product): Promise<void> {
    return this.updateQuantity(product, 1);
  }

  // addToHistory(product: Product): Promise<void> {
  //   return this.updateQuantity(product, 1);
  // }

  async removeFromCart(product: Product): Promise<void> {
    return this.updateQuantity(product, -1);
  }

  async clearCart(): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let cartLines$ = this.getCartLines(cartId);

    return this.removeCartLines(cartLines$);
  }

  unassignCart(): void {
    localStorage.removeItem('cartId');
  }

  private async updateQuantity(
    product: Product,
    change: number
  ): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let cartLine$ = this.getCartLine(cartId, product.key);
    // console.log(cartLine$);
    // let cartHistory$ = this.getCartHistory(cartId, product.key);

    cartLine$
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map((scl) => ({ key: scl.key, ...scl.payload.val() })))
      .subscribe((cl) => {
        let quantity = (cl.quantity || 0) + change;
        if (quantity === 0) return this.removeCartLine(cartLine$);

        return this.updateCartLine(cartLine$, {
          title: product.title,
          volume: product.volume,
          imageUrl: product.imageUrl,
          quantity: (cl.quantity || 0) + change,
          productSelectedOn: new Date().toString(),
        });
      });

    // cartHistory$
    //   .snapshotChanges()
    //   .pipe(take(1))
    //   .pipe(map((scl) => ({ key: scl.key, ...scl.payload.val() })))
    //   .subscribe((cl) => {
    //     let quantity = (cl.quantity || 0) + change;
    //     if (quantity === 0) return this.removeCartLine(cartLine$);

    //     return this.updateCartLine(cartLine$, {
    //       title: product.title,
    //       volume: product.volume,
    //       imageUrl: product.imageUrl,
    //       quantity: (cl.quantity || 0) + change,
    //     });
    //   });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let cart = this.create();
    localStorage.setItem('cartId', cart.key);

    return cart.key;
  }

  private create(): firebase.database.ThenableReference {
    return this.db.list(this.dbPath).push({
      createdOn: new Date().toString()
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

  // private getCartHistory(
  //   cartId: string,
  //   productId: string
  // ): AngularFireObject<CartLine>{
  //   return this.db.object<CartLine>(
  //     `${this.dbPath}/${cartId}/cartHistory/${productId}`
  //   );
  // }

  private updateCartLine(
    cartLine$: AngularFireObject<CartLine>,
    cartLine: any
  ): Promise<void> {
    return cartLine$.update(cartLine);
  }

  private removeCartLine(
    cartLine$: AngularFireObject<CartLine>
  ): Promise<void> {
    return cartLine$.remove();
  }

  private getCartLines(cartId: string): AngularFireObject<CartLine> {
    return this.db.object<CartLine>(`${this.dbPath}/${cartId}/cartLines`);
  }

  private removeCartLines(
    cartLines$: AngularFireObject<CartLine>
  ): Promise<void> {
    return cartLines$.remove();
  }
}
