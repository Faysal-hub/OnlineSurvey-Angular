import { CartLine } from './cartLine';
import { Product } from './product';


export class Cart {
  public items: CartLine[] = [];
  constructor(
    public key: string,
    public cartLines: { [productId: string]: CartLine },
    public createdOn: string
  ) {
    for (let productId in this.cartLines) {
      this.items.push(new CartLine({ key: productId, ...this.cartLines[productId] }));
    }
  }

  get itemsCount(): number {
    let count = 0;

    for (let cartLine of this.items) {
      count += cartLine.quantity;
    }

    return count;
  }

  get totalVolume(): number {
    let total = 0;
    for (let item of this.items) {
      total += item.totalVolume;
    }

    return total;
  }

  getQuantity(product: Product): number {
    if (!this.cartLines) return 0;

    let cartLine: CartLine = this.cartLines[product.key];
    return cartLine ? cartLine.quantity : 0;
  }
}
