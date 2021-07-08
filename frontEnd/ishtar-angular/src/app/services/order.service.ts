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

  // http://localhost:8080/api/allOrders?page={value}&size={value}
  getAllOrders(page:any, size:any): Observable<Order[]>{
   return this.http.get<Order[]>(`${this.baseUrl}/allOrders?page=${page}&size=${size}`).pipe(
     map( response => response)
   );
  }

  // http://localhost:8080/api/category?id={value}&page={value}&size={value}
  getOrdersByCategoryId(id:any, page:any, size:any):Observable<Order[]>{
     return this.http.get<Order[]>(`${this.baseUrl}/category?id=${id}&page=${page}&size=${size}`).pipe(
       map(response => response)
     )
  }


   // http://localhost:8080/api/order-key?key={word}&page={value}&size={value}
   getOrdersByKey(word:any, page:any, size:any):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/order-key?key=${word}&page=${page}&size=${size}`).pipe(
      map(response => response)
    )
 }


 // http://localhost:8080/api/order?id={value}
 getOrderById(id:string | null): Observable<Order>{
  return this.http.get<Order>(`${this.baseUrl}/order?id=${id}`).pipe(
    map(response => response)
  );
}



getOrdersLength():Observable<number>{
  return this.http.get<number>(`${this.baseUrl}/order-size`).pipe(
    map(response => response)
  )
}


getOrdersLengthByCategoryId(id:any):Observable<number>{
   return this.http.get<number>(`${this.baseUrl}/category-size?id=${id}`)
}


getOrdersLengthByKeywordSearch(key:string):Observable<number>{
  return this.http.get<number>(`${this.baseUrl}/key-size?key=${key}`)
}



}
