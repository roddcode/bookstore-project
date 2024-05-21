import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartItemCountSubscription: Subscription | undefined;

  constructor(private cartService: CartService ) {}

  ngOnInit(): void {
    this.cartItemCountSubscription = this.cartService
      .getCartItemCount()
      .subscribe((count: number) => {
        this.cartItemCount = count;
      });
  }

  ngOnDestroy(): void {
    this.cartItemCountSubscription?.unsubscribe();
  }
}
