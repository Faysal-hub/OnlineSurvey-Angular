import { Product } from './../../models/product';
import { map } from 'rxjs/operators';
import { ProductsService } from './../../products.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService) {
    this.products$ = this.productsService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map((product) => ({
            key: product.key,
            ...product.payload.val(),
          }))
        )
      );
  }
}
