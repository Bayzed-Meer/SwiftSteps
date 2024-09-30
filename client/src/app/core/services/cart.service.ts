import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addToCart(product: any) {
    const existingItem = this.cartItems.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      existingItem.requestedQuantity += 1;
    } else {
      const newItem = { ...product, requestedQuantity: 1 };
      this.cartItems.push(newItem);
    }
  }

  getCartItems() {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
  }

  incrementQuantity(item: any) {
    item.requestedQuantity += 1;
  }

  decrementQuantity(item: any) {
    if (item.requestedQuantity > 1) {
      item.requestedQuantity -= 1;
    } else {
      this.removeItem(item);
    }
  }
  updateQuantity(item: any) {
    if (item.requestedQuantity >= 1) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem._id === item._id) {
          cartItem.requestedQuantity = item.requestedQuantity;
        }
      });
    } else {
      this.removeItem(item);
    }
  }
  removeItem(item: any) {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
