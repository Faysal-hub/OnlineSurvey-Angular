import { Shipping } from './shipping';
import { Cart } from './cart';
import { OrderLine } from './orderLine';

export class Order {
  submittedOn = new Date().toString();
  orderLines: OrderLine[];
  cartId: string;

  constructor(cart: Cart, public shipping: Shipping) {
    this.orderLines = cart.items.map(
      (item) =>
        new OrderLine(item.title, item.imageUrl, item.volume, item.quantity)
    );
    this.cartId = cart.key;
  }
}

