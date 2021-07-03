import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  // http://localhost:8080/api/allOrders
  getAllOrders(): Observable<Order[]>{
   return this.http.get<Order[]>(`${this.baseUrl}/allOrders`).pipe(
     map( response => response)
   );
  }

  // http://localhost:8080/api/category?id={value}
  getOrdersByCategoryId(id: number):Observable<Order[]>{
     return this.http.get<Order[]>(`${this.baseUrl}/category?id=${id}`).pipe(
       map(response => response)
     )
  }


}
