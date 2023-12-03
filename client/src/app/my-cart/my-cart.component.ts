import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent {
  cartItems: any[] = [];
  outOfStockMessages: string[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.updateCartItems();
  }

  updateCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  incrementQuantity(item: any) {
    this.cartService.incrementQuantity(item);
    this.cartItems = this.cartService.getCartItems();
  }

  decrementQuantity(item: any) {
    this.cartService.decrementQuantity(item);
    this.cartItems = this.cartService.getCartItems();
  }
  updateQuantity(item: any) {
    this.cartService.updateQuantity(item);
    this.cartItems = this.cartService.getCartItems();
  }
  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, product) => total + product.requestedQuantity * product.price,
      0
    );
  }

  openSnackBar(message: string): void {
    const config = {
      duration: 700,
      verticalPosition: 'top',
    } as MatSnackBarConfig;
    this.snackBar.open(message, 'Close', config);
  }

  checkout(): void {
    const totalBill = this.getTotalPrice();
    this.outOfStockMessages = [];

    if (totalBill > 0) {
      this.cartItems.forEach((item) => {
        if (item.requestedQuantity > item.quantity) {
          this.outOfStockMessages.push(`${item.productName} is out of stock.`);
        }
      });

      if (this.outOfStockMessages.length > 0) {
        return;
      } else {
        this.cartItems.forEach((item) => {
          item.quantity -= item.requestedQuantity;

          if (item.quantity === 0) {
            this.productService.deleteProduct(item._id).subscribe(() => {
              console.log('Product deleted from the database');
            });
          } else {
            this.productService.updateProduct(item).subscribe(() => {
              console.log('Product updated in the database');
            });
          }
        });

        this.cartService.clearCart();
        this.openSnackBar('Purchase completed!');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 700);
      }
    } else {
      this.openSnackBar('No items in the cart');
    }
  }
}
