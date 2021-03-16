import { Product } from './models/product';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
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

  getByCategory(category: string): AngularFireList<Product> {
    return this.db.list<Product>(this.dbPath, (ref) => {
      return ref.orderByChild('category').equalTo(category);
    });
  }

  get(key: string): AngularFireObject<Product> {
    return this.db.object<Product>(`${this.dbPath}/${key}`);
  }

  create(product: Product): firebase.database.ThenableReference {
    return this.products.push(product);
  }

  update(key: string, product: Product): Promise<void> {
    return this.db.object<Product>(`${this.dbPath}/${key}`).update(product);
  }

  delete(key: string): Promise<void> {
    return this.db.object<Product>(`${this.dbPath}/${key}`).remove();
  }
}
