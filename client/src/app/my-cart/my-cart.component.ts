import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  incrementQuantity(item: any) {
    this.cartService.incrementQuantity(item);
  }

  decrementQuantity(item: any) {
    this.cartService.decrementQuantity(item);
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
  }
}
