import { Product } from './../../models/product';
import { map } from 'rxjs/operators';
import { ProductsService } from './../../products.service';
import {
  Component,
  OnDestroy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private products: Product[];
  private subscription: Subscription;
  columns: Columns[];
  data: Product[] = [];
  configuration: Config;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  constructor(private productsService: ProductsService) {
    this.subscription = this.productsService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
      )
       .subscribe(products => {
     this.products = products;
     this.feedTable(this.products);
    });
  }

  ngOnInit(): void {
    this.initTable()
  }

  private initTable() {
    this.configuration = { ...DefaultConfig };
    this.columns = [
      { key: 'title', title: 'Title' },
      { key: 'volume', title: 'Volume' },
      { key: 'key', title: '', cellTemplate: this.actionTpl }
    ]; 
  }

  private feedTable(products: Product[]) {
    this.data = products;
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;

    this.feedTable(filteredProducts);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
