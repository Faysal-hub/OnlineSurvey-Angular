import { Observable } from 'rxjs';
import { AppUser } from './models/appUser';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly dbPath = '/users';

  constructor(private db: AngularFireDatabase) {}

  save(key: string, value: any): Promise<void> {
    return this.db.object(`${this.dbPath}/${key}`).update(value);
  }

  get(key: string): AngularFireObject<AppUser> {
    return this.db.object<AppUser>(`${this.dbPath}/${key}`);
}

}