import { Product } from './../../models/product';
import { ProductsService } from './../../products.service';
import { CategoriesService } from './../../category.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { map, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  product: Product = {} as Product;
  categories$: Observable<Category[]>;
  id: string;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.init();
  }

  private init() {
    this.getProductOnEdit();
    this.getCategories();
  }

  private getProductOnEdit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.id) return;

    this.productsService
      .get(this.id)
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map((sp) => ({ key: sp.key, ...sp.payload.val() })))
      .subscribe((p) => (this.product = p));
  }

  private getCategories() {
   this.categories$ = this.categoriesService
     .getAll()
     .snapshotChanges()
     .pipe(
       map((scs) => scs.map((sc) => ({ key: sc.key, ...sc.payload.val() })))
     );
  }

  save(f: NgForm) {
    if (this.id) this.productsService.update(this.product.key, f.value);
    else this.productsService.create(f.value);

    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    console.log(this.product.key);
    this.productsService.delete(this.product.key);
    this.router.navigate(['/admin/products']);
  }
}
