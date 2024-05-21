import { Injectable } from '@angular/core';
import { serverApi } from '../serverApi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = serverApi.serverUrl;
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }
}
