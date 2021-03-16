import { Category } from './models/category';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly dbPath = '/categories';

  constructor(private db: AngularFireDatabase) {}

  getAll(): AngularFireList<Category> {
    return this.db.list<Category>(this.dbPath, (ref) => {
      return ref.orderByChild('name');
    });
  }
}
