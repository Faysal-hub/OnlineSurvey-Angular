import { Product } from './models/product';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly dbPath = '/products';
  private products: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {
    this.products = this.db.list<Product>(this.dbPath);
  }

  getAll(): AngularFireList<Product> {
    return this.products;
  }

  create(product: Product): firebase.database.ThenableReference {
    return this.products.push(product);
  }
}
