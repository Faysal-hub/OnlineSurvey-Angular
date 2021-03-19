import { Cart } from './../models/cart';
import { CartService } from './../cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy {
  products$: Observable<Product[]>;
  cart: Cart;
  cartSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.getProducts();
    this.getCart();
  }

  private getProducts(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        if (!params) return of(null);

        let category = params.get('category');

        if (!category)
          return this.productsService
            .getAll()
            .snapshotChanges()
            .pipe(
              map((sps) =>
                sps.map((sp) => ({ key: sp.key, ...sp.payload.val() }))
              )
            );

        return this.productsService
          .getByCategory(category)
          .snapshotChanges()
          .pipe(
            map((sps) =>
              sps.map((sp) => ({ key: sp.key, ...sp.payload.val() }))
            )
          );
      })
    );
  }

  private async getCart() {
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

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
