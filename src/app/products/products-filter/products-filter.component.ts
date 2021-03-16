import { CategoriesService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css'],
})
export class ProductsFilterComponent {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {
    this.getCategories();
  }

  private getCategories(): void {
    this.categories$ = this.categoriesService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((scs) => scs.map((sc) => ({ key: sc.key, ...sc.payload.val() })))
      );
  }
}
