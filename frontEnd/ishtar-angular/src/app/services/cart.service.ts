import { Order } from './../model/order';
import { CartOrder } from './../model/cart-order';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orders: CartOrder[] = [];

  // totalPrice:number = 0;
  totalPrice: Subject<number> = new Subject<number>();

  // totalSize:number = 0;
  totalSize: Subject<number> = new Subject<number>();

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
    this.calculateTotals();

  }
  calculateTotals(){
    let totalOfQuantity:number = 0;
    let totalOfPrice:number = 0;
    for(let temp of this.orders){
       totalOfQuantity = totalOfQuantity + temp.quantity!;
       totalOfPrice += temp.quantity! * temp.price!;
    }
    // this.totalSize = totalOfQuantity;
    this.totalSize.next(totalOfQuantity);

    // this.totalPrice = totalOfPrice;
    this.totalPrice.next(totalOfPrice);

    console.log("size of quantity " + this.totalSize)
    console.log("size of price " + this.totalPrice)
  }


  removeOrder(order: CartOrder){

    order.quantity!--;

    if(order.quantity === 0){

      this.remove(order);

    }
    else{

      this.calculateTotals();

    }
  }

  remove(order: CartOrder){

    const index = this.orders.findIndex(temp => temp.id === order.id);

    if(index > -1){

       this.orders.splice(index,1);

       this.calculateTotals();
    }
  }



}
