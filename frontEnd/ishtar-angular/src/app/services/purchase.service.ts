import { Observable } from 'rxjs';
import { PurchaseRequest } from './../model/form/purchase-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getOrder(purchaseRequest:PurchaseRequest):Observable<any>{
    return this.http.post<PurchaseRequest>(`${this.baseUrl}/buy/purchase`,purchaseRequest);
  }


}
