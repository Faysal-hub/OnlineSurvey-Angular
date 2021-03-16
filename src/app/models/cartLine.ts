import { Product } from './product';

export interface CartLine {
  key: string;
  product: Product;
  quantity: number;
}
