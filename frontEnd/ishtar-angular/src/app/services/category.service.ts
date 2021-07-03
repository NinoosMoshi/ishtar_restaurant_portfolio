import { Category } from './../model/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/allCategories`).pipe(
      map(response => response)
    );
  }

}
