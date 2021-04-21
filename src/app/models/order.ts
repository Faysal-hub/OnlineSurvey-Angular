import { Cart } from './cart';
import { OrderLine } from './orderLine';

export class Order {
  createdOn = new Date().toString();
  orderLines: OrderLine[];
  cartId: string;

  constructor(cart: Cart) {
    this.orderLines = cart.items.map(
      (item) =>
        new OrderLine(
          item.title,
          item.imageUrl,
          item.volume,
          item.quantity,
          item.totalVolume
        )
    );
    this.cartId = cart.key;
  }
}

