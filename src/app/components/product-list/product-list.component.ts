import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  product: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getProduct().subscribe({
      next: (product: Product[]) => {
        this.product = product;
        console.log(this.product);
      },
      error: (error: any) => console.log(error),
    });
  }
}
