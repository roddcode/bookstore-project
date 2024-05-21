import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  id: number = 0;
  producto: Product | undefined;
  productSub: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']) || 0;
    console.log('ID:', this.id);
    this.productSub = this.productService.getProduct().subscribe({
      next: (products: Product[]) => {
        console.log('ID:', this.id);
        this.producto = products.find((p) => p.id === this.id);
        if (!this.producto) {
          console.log(`No se encontró ningún producto con el ID ${this.id}`);
        } else {
          console.log(this.producto);
        }
      },
      error: (error: any) => console.log(error),
    });
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
