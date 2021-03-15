import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly dbPath = '/products';

  constructor(private db: AngularFireDatabase) {}

  create(product: Product): firebase.database.ThenableReference {
    return this.db.list<Product>(this.dbPath).push(product);
  }
}
