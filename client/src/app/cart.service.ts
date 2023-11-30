import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addToCart(product: any) {
    const existingItem = this.cartItems.find(
      (item) => item.shortCode === product.shortCode
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...product, quantity: 1 };
      this.cartItems.push(newItem);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  incrementQuantity(item: any) {
    item.quantity += 1;
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.shortCode === item.shortCode
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
