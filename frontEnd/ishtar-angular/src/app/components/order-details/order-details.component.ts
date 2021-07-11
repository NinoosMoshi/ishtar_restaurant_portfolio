import { CartService } from './../../services/cart.service';
import { CartOrder } from './../../model/cart-order';

import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order!: Order;

  constructor(private orderService: OrderService,
              private activeRoute: ActivatedRoute,
              private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.getOrderByOrderId();
  }


 getOrderByOrderId(){
   let orderId = this.activeRoute.snapshot.paramMap.get('id');
   this.orderService.getOrderById(orderId).subscribe( data =>{
     this.order = data
   })
 }


 addToCart(order: Order){
   const cartOrder = new CartOrder(order);
   this.cartService.addOrderToCart(cartOrder);
 }





}
