import { CartOrder } from './../cart-order';
export class Item {

  image?: string;
  quantity?: number;
  price?: number;

  constructor(cartOrder:CartOrder){
    this.image = cartOrder.image;
    this.quantity = cartOrder.quantity;
    this.price = cartOrder.price;
  }


}
