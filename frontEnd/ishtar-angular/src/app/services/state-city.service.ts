import { City } from './../model/city';
import { State } from './../model/state';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateCityService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  //http://localhost:8080/api/states
  getAllState(): Observable<State[]>{
     return this.http.get<State[]>(`${this.baseUrl}/states`).pipe(
      map(response => response)
    );
  }


    //http://localhost:8080/api/cities
    getAllCities(): Observable<City[]>{
      return this.http.get<City[]>(`${this.baseUrl}/cities`).pipe(
       map(response => response)
     );
   }


}
