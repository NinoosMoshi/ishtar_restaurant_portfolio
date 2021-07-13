import { CartService } from './../../services/cart.service';
import { CartOrder } from './../../model/cart-order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  totalPrice:number = 0;
  totalSize:number = 0;

  orders: CartOrder[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllOrder();
    this.getTotal();
  }

  getTotal(){
    this.cartService.totalPrice.subscribe(
      data =>{
        this.totalPrice = data
      }
    )
    this.cartService.totalSize.subscribe(
      data =>{
        this.totalSize = data
      }
    )

    this.cartService.calculateTotals();

  }

  getAllOrder(){
    this.orders = this.cartService.orders;
  }

  increaseOrder(temp: CartOrder){
     this.cartService.addOrderToCart(temp);
  }

  removeOrders(temp: CartOrder){
     this.cartService.removeOrder(temp);
  }

  remove(temp: CartOrder){
    this.cartService.remove(temp);
  }


}
