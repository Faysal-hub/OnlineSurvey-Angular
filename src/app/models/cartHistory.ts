import { CartLine } from './cartLine';
import { Product } from './product';

export interface CartHistory {
  key: string;
  product: Product;
  eType: string;
  selectedOn: string;
}
