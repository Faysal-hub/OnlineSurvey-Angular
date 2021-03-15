import { Category } from './models/category';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly dbPath = '/categories';

  constructor(private db: AngularFireDatabase) {}

  getCategories(): AngularFireList<Category> {
    return this.db.list<Category>(this.dbPath, (ref) => {
      return ref.orderByChild('name');
    });
  }
}
