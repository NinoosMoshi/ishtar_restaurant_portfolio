import { CartOrder } from './../model/cart-order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orders: CartOrder[] = [];
  totalPrice:number = 0;
  totalSize:number = 0;

  constructor() { }



  addOrderToCart(cartOrder: CartOrder){

    let isExists: boolean = false;
    let existsOrder: CartOrder | undefined;

    if(this.orders.length > 0){
      //  for(let temp of this.orders){
      //     if(temp.id === cartOrder.id){
      //        existsOrder = temp;
      //        break;
      //     }
      //  }
      existsOrder = this.orders.find(temp => temp.id === cartOrder.id);

    }

    isExists= (existsOrder != undefined)

    if (isExists && existsOrder?.quantity) {
      existsOrder.quantity++;
    }
    else{
       this.orders.push(cartOrder);
    }

    console.log(this.orders);

  }

}
