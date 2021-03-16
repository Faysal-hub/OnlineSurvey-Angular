import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.getProducts();
  }

  private getProducts() : void {
    this.products$ = this.route.queryParamMap
    .pipe(switchMap(params => {
      if (!params)
        return of(null);

      let category = params.get('category');

      if (!category)
        return this.productsService.getAll()
        .snapshotChanges()
        .pipe(map(sps => sps.map(sp => ({ key: sp.key, ...sp.payload.val() }))));

      return this.productsService.getByCategory(category)
      .snapshotChanges()
      .pipe(map(sps => sps.map(sp => ({ key: sp.key, ...sp.payload.val() }))));
    }));
  }
}

