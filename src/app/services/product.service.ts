import { Injectable } from '@angular/core';
import { serverApi } from '../serverApi';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = serverApi.serverUrl;
  private cart: Product[] = [];
  private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private distinctItemCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
    this.updateDistinctItemCount();
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart);
      this.updateDistinctItemCount();
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.updateDistinctItemCount();
  }

  private updateDistinctItemCount(): void {
    const distinctItemCount = new Set(this.cart.map((product) => product.id))
      .size;
    this.distinctItemCountSubject.next(distinctItemCount);
  }

  getDistinctItemCount(): Observable<number> {
    return this.distinctItemCountSubject.asObservable();
  }
}
