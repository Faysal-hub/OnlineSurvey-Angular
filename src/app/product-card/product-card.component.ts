import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
