import { ProductsService } from './../../products.service';
import { CategoriesService } from './../../category.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {
    this.categories$ = this.categoriesService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map((categories) =>
          categories.map((c) => ({ key: c.key, ...c.payload.val() }))
        )
      );
  }

  save(f: NgForm) {
    this.productsService.create(f.value);
  }
}
