import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  page: number = 1;
  pageLength: number = 5;  // pageSize
  totalOrder:number = 0;  // collectionSize, the total number of orders
  orders: Order[]=[];

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () =>{
        this.finishOrders();
      }
    )


  }

  finishOrders(){
    let result1 = this.activatedRoute.snapshot.paramMap.has('id');
    let result2 = this.activatedRoute.snapshot.paramMap.has('key');
    if(result1){
      this.getOrdersByCategoryId();
    }else if(result2){
      this.getOrdersByContainingKey();
    }else{
      this.getOrders();
    }
  }



  getOrders(){
    this.orderService.getAllOrders(this.page - 1,this.pageLength).subscribe(
      data =>{
       this.orders = data;
    })
  }


  getOrdersByCategoryId(){
    let categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrdersLengthByCategoryId(categoryId).subscribe(
      data =>{
        this.totalOrder = data
      }
    )
    this.orderService.getOrdersByCategoryId(categoryId,this.page - 1,this.pageLength).subscribe(
      data =>{
        this.orders = data
      }
    )
  }

  getOrdersByContainingKey() {
    let keyword = this.activatedRoute.snapshot.paramMap.get('key');
    this.orderService.getOrdersLengthByKeywordSearch(keyword).subscribe(
      data =>{
        this.totalOrder = data
      }
    )
    this.orderService.getOrdersByKey(keyword,this.page - 1,this.pageLength).subscribe(
      data =>{
        this.orders = data
      }
    )
  }




  doing(){
    this.finishOrders();
  }



}
