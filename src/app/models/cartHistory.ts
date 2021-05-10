import { Product } from './product';

export class CartHistory {
  key: string;
  title: string;
  pictureNum:string;
  constructor(init?: Partial<CartHistory>) {
    Object.assign(this, init);
  }
}
