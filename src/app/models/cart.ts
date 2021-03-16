import { CartLine } from './cartLine';
export interface Cart {
  key: string;
  cartLines: CartLine[];
  createdOn: string;
} 
