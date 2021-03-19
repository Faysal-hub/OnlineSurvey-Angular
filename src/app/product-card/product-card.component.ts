import { CartLine } from './../models/cartLine';
import { CartService } from './../cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('cart') cart: Cart;
  @Input('showActions') showActions: boolean = true;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
      if (this.cart.getQuantity(this.product) == 0)    
      return;

    this.cartService.removeFromCart(this.product);
  }
}
