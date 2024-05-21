// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private distinctItemCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor() {}

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

  // Implementación del método getCartItemCount
  getCartItemCount(): Observable<number> {
    return this.distinctItemCountSubject.asObservable();
  }
}
