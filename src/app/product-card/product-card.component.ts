
import { CartLine } from './../models/cartLine';
import { CartService } from './../cart.service';
import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

  closeResult = '';

  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    // this.cartService.addToHistory(this.product);

  }

  removeFromCart(): void {
    if (this.cart.getQuantity(this.product) == 0) return;

    this.cartService.removeFromCart(this.product);
  }
}
