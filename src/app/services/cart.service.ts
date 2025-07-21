import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CurrencyService } from './currency.service';

export interface CartItem {
  id: string;
  productId: string;
  product: Product; // Reference to the full product
  quantity: number;
  addedAt: Date;
  selectedSize?: string;
  selectedColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private currencyService: CurrencyService) {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(
      ci => ci.product.id === item.product.id && ci.selectedSize === item.selectedSize && ci.selectedColor === item.selectedColor
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      this.cartItemsSubject.next(updatedItems);
    } else {
      this.cartItemsSubject.next([...currentItems, item]);
    }
    this.saveCart();
  }

  removeFromCart(productId: string, selectedSize?: string, selectedColor?: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(
      ci => !(ci.product.id === productId && ci.selectedSize === selectedSize && ci.selectedColor === selectedColor)
    );
    this.cartItemsSubject.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number, selectedSize?: string, selectedColor?: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedItems);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  generateWhatsAppOrderMessage(): string {
    let message = "Hello, I'd like to place an order:\n\n";
    let total = 0;

    this.cartItemsSubject.value.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      if (item.selectedSize) message += `   selectedSize: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `   selectedColor: ${item.selectedColor}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ${this.currencyService.formatPrice(item.product.price)}\n`;
      message += `   Subtotal: ${this.currencyService.formatPrice(item.product.price * item.quantity)}\n\n`;
      total += item.product.price * item.quantity;
    });

    message += `💰 *Total: ${this.currencyService.formatPrice(total)}*\n\n`;
    message += "Please confirm my order.";

    return message;
  }
}