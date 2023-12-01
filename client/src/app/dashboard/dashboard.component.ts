import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart.service';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  product: any;
  isLoading = true;
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.snackBar.open('Product added to cart', 'Dismiss', {
      duration: 700,
    });

    const cartItems = this.cartService.getCartItems();
    console.log('Updated Cart Items:', cartItems);
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
}
