import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../services/product.service';
import { NgIf, NgFor } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatProgressBar,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}
  product: any;
  isLoading = true;

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.isLoading = false;
      },
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.snackBar.open('Product added to cart', 'Dismiss', {
      duration: 700,
      verticalPosition: 'top',
    });
  }

  getImage(url: any): string {
    return `https://profilexpert.onrender.com/${url}`;
  }
}
