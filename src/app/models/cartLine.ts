import { Product } from './product';

export interface CartLine {
  key: string;
  title: string;
  volume: number;
  imageUrl: string;
  quantity: number;
}
