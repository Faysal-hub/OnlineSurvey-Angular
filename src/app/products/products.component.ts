import { Product } from './../models/product';
import { Cart } from './../models/cart';
import { CartService } from './../cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<Product[]>;
  randomProductsSource = new BehaviorSubject<Product[] | null>(null);
  randomProducts$ = this.randomProductsSource.asObservable();
  cart$: Observable<Cart>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.getProducts();
    this.getCart();

    this.products$.subscribe((_products) => {
      if (_products && _products?.length > 0) {
        this.randomizeArray(_products);
        this.setRandomProducts(_products);
      }
    });
  }


  private getProducts(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        if (!params) return of(null);

        let category = params.get('category');
        return this.applyFilter(category);
      })
    );
  }

  private applyFilter(category: string): Observable<Product[]> {
    if (!category)
      return this.productsService
        .getAll()
        .snapshotChanges()
        .pipe(
          map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
        );

    return this.productsService
      .getByCategory(category)
      .snapshotChanges()
      .pipe(
        map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
      );
  }

  private async getCart() {
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

  private setRandomProducts(data: Product[] | null) {
    this.randomProductsSource.next(data);
  }

  private randomizeArray(arrayProducts) {
     for (let i = arrayProducts.length-1; i > 0; i--) {
        const j = Math.floor( Math.random()*(i+1) );
        [arrayProducts[i], arrayProducts[j]] = [arrayProducts[j], arrayProducts[i]];
     }
  }

}